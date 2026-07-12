(function (root) {
  function calculateUVLevel(uv) {
    const safeUV = Number(uv) || 0;
    if (safeUV <= 2) return '안전';
    if (safeUV <= 5) return '보통';
    if (safeUV <= 7) return '주의';
    if (safeUV <= 10) return '위험';
    return '매우 위험';
  }

  root.calculateUVLevel = calculateUVLevel;
})(window);
