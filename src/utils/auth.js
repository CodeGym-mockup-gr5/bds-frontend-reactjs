const TOKEN_KEY = 'accessToken';

export function getToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch {
    return false;
  }
}

export function removeToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    return true;
  } catch {
    return false;
  }
}
