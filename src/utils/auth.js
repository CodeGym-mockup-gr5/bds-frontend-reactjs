const TOKEN_KEY = 'accessToken';
const REMEMBERED_USERNAME_KEY = 'rememberedUsername';

export const ROLES = {
  ADMIN: 'ADMIN',
  NHAN_VIEN: 'NHAN_VIEN',
  KHACH_HANG: 'KHACH_HANG',
};

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

export function getRememberedUsername() {
  try {
    return sessionStorage.getItem(REMEMBERED_USERNAME_KEY) || '';
  } catch {
    return '';
  }
}

export function setRememberedUsername(username) {
  try {
    if (!username) {
      sessionStorage.removeItem(REMEMBERED_USERNAME_KEY);
      return true;
    }
    sessionStorage.setItem(REMEMBERED_USERNAME_KEY, username);
    return true;
  } catch {
    return false;
  }
}

export function removeRememberedUsername() {
  try {
    sessionStorage.removeItem(REMEMBERED_USERNAME_KEY);
    return true;
  } catch {
    return false;
  }
}

export function normalizeRole(role) {
  if (typeof role !== 'string') {
    return '';
  }
  const normalized = role.trim().toUpperCase();
  return normalized.startsWith('ROLE_') ? normalized.slice(5) : normalized;
}

export function getUserRoles(user) {
  if (!user) {
    return [];
  }
  if (Array.isArray(user.roles) && user.roles.length > 0) {
    return user.roles;
  }
  if (!Array.isArray(user.vaiTro)) {
    return [];
  }
  return user.vaiTro.map(normalizeRole).filter(Boolean);
}

export function hasAnyRole(user, allowedRoles = []) {
  if (!allowedRoles || allowedRoles.length === 0) {
    return Boolean(user);
  }
  const userRoles = getUserRoles(user);
  return allowedRoles.some((role) => userRoles.includes(normalizeRole(role)));
}

export function getDefaultRouteByUser(user) {
  if (hasAnyRole(user, [ROLES.ADMIN])) {
    return '/admin';
  }
  if (hasAnyRole(user, [ROLES.NHAN_VIEN])) {
    return '/nhan-vien';
  }
  return '/';
}

function getInitials(hoTen, tenDangNhap) {
  const fullName = typeof hoTen === 'string' ? hoTen.trim() : '';
  if (fullName) {
    const words = fullName.split(/\s+/);
    const lastWord = words[words.length - 1];
    if (lastWord) {
      return lastWord.charAt(0).toUpperCase();
    }
  }
  const username = typeof tenDangNhap === 'string' ? tenDangNhap.trim() : '';
  if (username) {
    return username.charAt(0).toUpperCase();
  }
  return 'U';
}

export function enrichUser(rawUser) {
  if (!rawUser) {
    return null;
  }
  const roles = Array.isArray(rawUser.vaiTro)
    ? [...new Set(rawUser.vaiTro.map(normalizeRole).filter(Boolean))]
    : [];
  const kyTuDaiDien = rawUser.kyTuDaiDien || getInitials(rawUser.hoTen, rawUser.tenDangNhap);

  return {
    ...rawUser,
    roles,
    kyTuDaiDien,
  };
}
