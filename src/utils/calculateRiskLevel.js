(function (root) {
  function calculateRiskLevel(score) {
    const safeScore = Number(score) || 0;
    if (safeScore <= 60) return '안전';
    if (safeScore <= 120) return '보통';
    if (safeScore <= 180) return '주의';
    if (safeScore <= 250) return '위험';
    return '매우 위험';
  }

  root.calculateRiskLevel = calculateRiskLevel;
})(window);
