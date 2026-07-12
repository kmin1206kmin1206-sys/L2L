(function (root) {
  function calculateBMI(height, weight) {
    const safeHeight = Number(height) || 0;
    const safeWeight = Number(weight) || 0;
    if (!safeHeight || !safeWeight) return 0;
    const meters = safeHeight / 100;
    return Number((safeWeight / (meters * meters)).toFixed(1));
  }

  root.calculateBMI = calculateBMI;
})(window);
