(function (root) {
  function getExerciseIntensity(type) {
    switch (String(type)) {
      case 'walk':
      case '걷기':
        return 0;
      case 'fast_walk':
      case '빠른 걷기':
        return 1;
      case 'bike':
      case '자전거':
        return 2;
      case 'jog':
      case '조깅':
      case '등산':
      case '테니스':
        return 3;
      case 'basketball':
      case '농구':
        return 4;
      case 'soccer':
      case '축구':
        return 5;
      case 'jump_rope':
      case '줄넘기':
        return 6;
      default:
        return 0;
    }
  }

  root.getExerciseIntensity = getExerciseIntensity;
})(window);
