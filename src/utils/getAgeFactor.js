(function (root) {
  function getAgeFactor(age) {
    const safeAge = Number(age) || 0;
    if (safeAge >= 13 && safeAge <= 18) return 1.1;
    if (safeAge >= 19 && safeAge <= 39) return 1.0;
    if (safeAge >= 40 && safeAge <= 59) return 1.1;
    if (safeAge >= 60) return 1.3;
    return 1.0;
  }

  root.getAgeFactor = getAgeFactor;
})(window);
