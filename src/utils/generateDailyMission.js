(function (root) {
  function generateDailyMission(cycle = 0) {
    const missions = [
      { id: 'water', label: '물 한 잔 마시기' },
      { id: 'sunscreen', label: '자외선 차단제 바르기' },
      { id: 'shade', label: '그늘에서 5분 쉬기' },
      { id: 'stretch', label: '운동 전 스트레칭 하기' },
      { id: 'hat', label: '모자 또는 양산 챙기기' },
      { id: 'walk', label: '10분 이상 가볍게 걷기' },
      { id: 'hydrate', label: '운동 후 수분 보충하기' },
      { id: 'cooldown', label: '운동 후 쿨다운 하기' }
    ];
    const start = (Number(cycle) || 0) % missions.length;
    return Array.from({ length: 4 }, (_, index) => ({
      ...missions[(start + index) % missions.length],
      completed: false
    }));
  }

  root.generateDailyMission = generateDailyMission;
})(window);
