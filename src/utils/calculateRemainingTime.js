(function (root) {
  function calculateRemainingTime(riskScore, accumulatedUV) {
    const safeRiskScore = Number(riskScore) || 0;
    const safeAccumulatedUV = Number(accumulatedUV) || 0;
    const baseline = Math.max(0, 60 - safeRiskScore / 2.5);
    const uvPenalty = safeAccumulatedUV > 0 ? Math.max(0, Math.round(safeAccumulatedUV / 20)) : 0;
    return Math.max(5, Math.round(baseline - uvPenalty));
  }

  root.calculateRemainingTime = calculateRemainingTime;
})(window);
