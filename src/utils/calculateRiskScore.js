(function (root) {
  function calculateRiskScore({ uvFactor, exerciseTime, skinFactor, exerciseFactor, ageFactor, bmiFactor, genderFactor }) {
    return Number(
      (uvFactor * exerciseTime * skinFactor * exerciseFactor * ageFactor * bmiFactor * genderFactor).toFixed(1)
    );
  }

  root.calculateRiskScore = calculateRiskScore;
})(window);
