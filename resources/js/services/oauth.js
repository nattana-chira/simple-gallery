const ACCESS_TOKEN = "access_token";

export function isLoggedIn() {
  return !!getToken();
}

export function getToken() {
  return window.localStorage.getItem(ACCESS_TOKEN);
}

export function saveToken(token) {
  window.localStorage.setItem(ACCESS_TOKEN, token);
}

export function destroyToken() {
  window.localStorage.removeItem(ACCESS_TOKEN);
}

export default { getToken, saveToken, destroyToken };