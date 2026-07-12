(function (root) {
  function applyMissionBonus(riskScore, missionState) {
    const safeRiskScore = Number(riskScore) || 0;
    const completed = missionState || {};
    let adjusted = safeRiskScore;

    if (completed.sunscreen) adjusted *= 0.8;
    if (completed.hat) adjusted *= 0.9;
    if (completed.water) adjusted *= 0.95;
    if (completed.shade) adjusted *= 0.85;

    return Number(adjusted.toFixed(1));
  }

  root.applyMissionBonus = applyMissionBonus;
})(window);
