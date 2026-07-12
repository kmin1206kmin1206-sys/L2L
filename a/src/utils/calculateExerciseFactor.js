(function (root) {
  function calculateExerciseFactor(intensity) {
    const safeIntensity = Number(intensity) || 0;
    return 1 + (safeIntensity / 10);
  }

  root.calculateExerciseFactor = calculateExerciseFactor;
})(window);
