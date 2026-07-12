(function (root) {
  function calculateUV(lux) {
    const safeLux = Number(lux) || 0;
    return Math.min(11, Number((safeLux / 2000).toFixed(1)));
  }

  root.calculateUV = calculateUV;
})(window);
