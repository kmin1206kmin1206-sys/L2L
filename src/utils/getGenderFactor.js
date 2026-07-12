(function (root) {
  function getGenderFactor(gender) {
    if (String(gender) === 'female') return 1.05;
    return 1.0;
  }

  root.getGenderFactor = getGenderFactor;
})(window);
