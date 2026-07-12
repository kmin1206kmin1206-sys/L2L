(function (root) {
  function getSkinFactor(type) {
    switch (type) {
      case 'very':
        return 1.5;
      case 'sensitive':
        return 1.2;
      case 'normal':
        return 1.0;
      case 'strong':
        return 0.9;
      default:
        return 1.0;
    }
  }

  root.getSkinFactor = getSkinFactor;
})(window);
