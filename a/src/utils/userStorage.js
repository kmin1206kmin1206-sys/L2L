(function (root) {
  const storageKey = 'sun-care-user-data';

  function saveUserData(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  }

  function loadUserData() {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  }

  root.saveUserData = saveUserData;
  root.loadUserData = loadUserData;
})(window);
