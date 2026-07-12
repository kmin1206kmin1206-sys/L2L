(function (root) {
  const plantStages = ['씨앗', '새싹', '작은 잎', '큰 잎', '꽃봉오리', '꽃', '큰 나무'];
  const stageMessages = [
    '씨앗이 아주 작게 시작해요. 미션을 완수하면 한 걸음씩 자라납니다.',
    '새싹이 올라와요. 오늘 미션을 조금 더 채우면 잎이 더 많이 나와요.',
    '작은 잎이 보여요. 꾸준히 관리하면 더 크게 자랄 수 있어요.',
    '잎이 풍성해지고 있어요. 미션을 마무리해 보세요.',
    '꽃봉오리가 맺히고 있어요. 조금만 더 힘내면 꽃이 피어요.',
    '꽃이 활짝 피었어요. 건강한 습관이 아름다운 결과로 이어졌어요.',
    '나무가 크게 자랐어요. 지금의 루틴이 정말 잘 이어지고 있어요.'
  ];

  function calculatePlantStatus(growthScore) {
    const safeScore = Math.max(0, Math.min(100, Number(growthScore) || 0));
    const stageIndex = Math.min(plantStages.length - 1, Math.floor(safeScore / 14));
    const nextStageAt = Math.min(100, (stageIndex + 1) * 14);
    const remaining = Math.max(0, nextStageAt - safeScore);
    const status = {
      stage: plantStages[stageIndex],
      level: stageIndex + 1,
      growth: safeScore,
      className: safeScore < 15 ? 'seed' : safeScore < 30 ? 'sprout' : safeScore < 45 ? 'leaf' : safeScore < 60 ? 'large-leaf' : safeScore < 75 ? 'bud' : safeScore < 90 ? 'flower' : 'tree',
      message: stageMessages[stageIndex] || stageMessages[stageMessages.length - 1],
      nextStageAt,
      nextMessage: safeScore >= 100 ? '성장 목표를 모두 달성했어요.' : `${remaining}%만 더 채우면 다음 단계로 올라가요.`
    };
    return status;
  }

  root.calculatePlantStatus = calculatePlantStatus;
})(window);
