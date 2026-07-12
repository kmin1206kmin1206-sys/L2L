(function (root) {
  const storageKey = 'sun-care-friends';

  function sendFriendRequest(userId, targetId) {
    const requests = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (!requests.requests) requests.requests = [];
    requests.requests.push({ userId, targetId, status: 'pending' });
    localStorage.setItem(storageKey, JSON.stringify(requests));
    return requests.requests;
  }

  function acceptFriend(userId, targetId) {
    const requests = JSON.parse(localStorage.getItem(storageKey) || '{}');
    requests.requests = (requests.requests || []).filter((item) => !(item.userId === targetId && item.targetId === userId));
    if (!requests.friends) requests.friends = [];
    requests.friends.push({ userId, targetId });
    localStorage.setItem(storageKey, JSON.stringify(requests));
    return requests.friends;
  }

  function rejectFriend(userId, targetId) {
    const requests = JSON.parse(localStorage.getItem(storageKey) || '{}');
    requests.requests = (requests.requests || []).filter((item) => !(item.userId === targetId && item.targetId === userId));
    localStorage.setItem(storageKey, JSON.stringify(requests));
    return requests.requests || [];
  }

  function removeFriend(userId, targetId) {
    const requests = JSON.parse(localStorage.getItem(storageKey) || '{}');
    requests.friends = (requests.friends || []).filter((item) => !(item.userId === userId && item.targetId === targetId) && !(item.userId === targetId && item.targetId === userId));
    localStorage.setItem(storageKey, JSON.stringify(requests));
    return requests.friends || [];
  }

  function giveWater(friendId) {
    const requests = JSON.parse(localStorage.getItem(storageKey) || '{}');
    requests.waterLog = requests.waterLog || [];
    requests.waterLog.push({ friendId, at: Date.now() });
    localStorage.setItem(storageKey, JSON.stringify(requests));
    return requests.waterLog;
  }

  function sendCheer(friendId, message) {
    const requests = JSON.parse(localStorage.getItem(storageKey) || '{}');
    requests.cheers = requests.cheers || [];
    requests.cheers.push({ friendId, message, at: Date.now() });
    localStorage.setItem(storageKey, JSON.stringify(requests));
    return requests.cheers;
  }

  function getFriendRanking() {
    const data = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const friends = data.friends || [];
    return friends.map((friend, index) => ({ ...friend, rank: index + 1 }));
  }

  root.sendFriendRequest = sendFriendRequest;
  root.acceptFriend = acceptFriend;
  root.rejectFriend = rejectFriend;
  root.removeFriend = removeFriend;
  root.giveWater = giveWater;
  root.sendCheer = sendCheer;
  root.getFriendRanking = getFriendRanking;
})(window);
