const APP_NS = 'app1_';

function getItem(key) {
  return localStorage.getItem(APP_NS + key);
}

function setItem(key, value) {
  localStorage.setItem(APP_NS + key, value);
}

function getUsername() {
  return getItem('userName');
}
function setPresetUsername(username) {
  setItem('userName', username);
}
}
function getUserId() {
  return getItem('userId');
}
function setUserId(username) {
  setItem('userId', username);
}


export default {
  getUsername,
  setUsername,
  getUserId,
  setUserId
};
