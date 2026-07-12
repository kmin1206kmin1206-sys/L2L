(function (root) {
  function getBMIFactor(bmi) {
    const safeBMI = Number(bmi) || 0;
    if (safeBMI < 18.5) return 1.1;
    if (safeBMI < 25) return 1.0;
    if (safeBMI < 30) return 1.1;
    return 1.2;
  }

  root.getBMIFactor = getBMIFactor;
})(window);
