(function (root) {
  function calculateAccumulatedUV(currentUV, exerciseTime) {
    return Number((Number(currentUV) * Number(exerciseTime || 0)).toFixed(1));
  }

  root.calculateAccumulatedUV = calculateAccumulatedUV;
})(window);
