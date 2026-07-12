"""L2L 센서 수집 및 웹 서버."""

from __future__ import annotations

import json
import logging
import threading
import time
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import serial

PORT = "COM3"
BAUD_RATE = 115200
HTTP_PORT = 8000
LOG_FILE = Path(__file__).with_name("wireless_sensor_log.txt")
latest_sensor = {"temperature": None, "humidity": None, "lux": None, "updatedAt": None}
sensor_lock = threading.Lock()


def valid_reading(temperature: float, humidity: float, lux: float) -> bool:
    return -40 <= temperature <= 85 and 0 <= humidity <= 100 and 0 <= lux <= 100000


def update_sensor(temperature: float, humidity: float, lux: float) -> None:
    if not valid_reading(temperature, humidity, lux):
        logging.warning("Ignored invalid sensor values: %s, %s, %s", temperature, humidity, lux)
        return
    measured_at = datetime.now().isoformat(timespec="seconds")
    with sensor_lock:
        latest_sensor.update(temperature=temperature, humidity=humidity, lux=lux, updatedAt=measured_at)
    with LOG_FILE.open("a", encoding="utf-8") as log_file:
        log_file.write(f"[{measured_at}] temperature={temperature}C | humidity={humidity}% | lux={lux}\n")
    logging.info("Sensor: %.1fC, %.1f%%, %.0f lux", temperature, humidity, lux)


def consume_packets(buffer: str) -> str:
    while "[" in buffer and "]" in buffer:
        start = buffer.find("[")
        end = buffer.find("]", start)
        packet, buffer = buffer[start + 1:end], buffer[end + 1:]
        try:
            temperature, humidity, lux = (float(value.strip()) for value in packet.split(","))
            update_sensor(temperature, humidity, lux)
        except ValueError:
            logging.warning("Ignored malformed sensor packet: [%s]", packet)
    return buffer[-1024:]


def read_serial_forever() -> None:
    buffer = ""
    while True:
        try:
            with serial.Serial(PORT, BAUD_RATE, timeout=0.5) as device:
                device.reset_input_buffer()
                logging.info("Connected to sensor on %s", PORT)
                while True:
                    chunk = device.read(device.in_waiting or 1).decode("utf-8", errors="ignore")
                    if chunk:
                        buffer = consume_packets(buffer + chunk)
        except serial.SerialException as error:
            logging.warning("Sensor unavailable on %s: %s. Retrying in 3 seconds.", PORT, error)
            time.sleep(3)


class L2LRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):  # noqa: N802
        if self.path.split("?", 1)[0] == "/api/sensor":
            with sensor_lock:
                payload = dict(latest_sensor)
            payload["connected"] = payload["updatedAt"] is not None
            body = json.dumps(payload).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")
    threading.Thread(target=read_serial_forever, name="sensor-reader", daemon=True).start()
    server = ThreadingHTTPServer(("127.0.0.1", HTTP_PORT), L2LRequestHandler)
    logging.info("Open http://127.0.0.1:%s/index.html", HTTP_PORT)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        logging.info("Server stopped")
    finally:
        server.server_close()
