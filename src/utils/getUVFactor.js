(function (root) {
  function getUVFactor(uv) {
    const safeUV = Number(uv) || 0;
    if (safeUV <= 2) return 1.0;
    if (safeUV <= 5) return 1.5;
    if (safeUV <= 7) return 2.0;
    if (safeUV <= 10) return 2.5;
    return 3.0;
  }

  root.getUVFactor = getUVFactor;
})(window);
