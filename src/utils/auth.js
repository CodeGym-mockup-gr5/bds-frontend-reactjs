const TOKEN_KEY = 'accessToken';
const REMEMBERED_USERNAME_KEY = 'rememberedUsername';
export const AUTH_TOKEN_CHANGED_EVENT = 'realia:auth-token-changed';

function notifyTokenChange(token) {
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent(AUTH_TOKEN_CHANGED_EVENT, { detail: { token } }));
  }
}

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
    notifyTokenChange(token);
    return true;
  } catch {
    return false;
  }
}

export function removeToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    notifyTokenChange(null);
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
  if (role && typeof role === 'object') {
    const candidate = role.authority || role.role || role.maVaiTro || role.tenVaiTro || role.name;
    return normalizeRole(candidate);
  }
  if (typeof role !== 'string') {
    return '';
  }
  const normalized = role.trim().toUpperCase();
  return normalized.startsWith('ROLE_') ? normalized.slice(5) : normalized;
}

export function extractRoleList(rawRoles) {
  if (Array.isArray(rawRoles)) {
    return [...new Set(rawRoles.map(normalizeRole).filter(Boolean))];
  }
  if (typeof rawRoles === 'string') {
    return [...new Set(rawRoles.split(',').map(normalizeRole).filter(Boolean))];
  }
  if (rawRoles && typeof rawRoles === 'object') {
    const single = normalizeRole(rawRoles);
    return single ? [single] : [];
  }
  return [];
}

export function getUserRoles(user) {
  if (!user || typeof user !== 'object') {
    return [];
  }
  return extractRoleList(user.roles ?? user.vaiTro ?? user.role ?? user.authorities);
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

export function canAccessRoute(user, path) {
  if (!path || typeof path !== 'string' || path === '/dang-nhap') {
    return false;
  }
  if (path === '/admin' || path.startsWith('/admin/')) {
    return hasAnyRole(user, [ROLES.ADMIN]);
  }
  if (path === '/nhan-vien' || path.startsWith('/nhan-vien/')) {
    return hasAnyRole(user, [ROLES.NHAN_VIEN, ROLES.ADMIN]);
  }
  if (path === '/khach-hang' || path.startsWith('/khach-hang/')) {
    return hasAnyRole(user, [ROLES.KHACH_HANG]);
  }
  return true;
}

export function resolvePostLoginRoute(user, requestedPath) {
  if (requestedPath && canAccessRoute(user, requestedPath)) {
    return requestedPath;
  }
  return getDefaultRouteByUser(user);
}

export function getAvatarInitial(user) {
  if (!user || typeof user !== 'object') {
    return '';
  }
  const hoTen = user.hoTen || user.fullName || user.name;
  const fullName = typeof hoTen === 'string' ? hoTen.trim() : '';
  if (fullName) {
    const words = fullName.split(/\s+/);
    const lastWord = words[words.length - 1];
    if (lastWord) {
      return lastWord.charAt(0).toUpperCase();
    }
  }
  const tenDangNhap = user.tenDangNhap || user.username;
  const username = typeof tenDangNhap === 'string' ? tenDangNhap.trim() : '';
  if (username) {
    return username.charAt(0).toUpperCase();
  }
  return '';
}

export function enrichUser(rawUser) {
  if (!rawUser || typeof rawUser !== 'object') {
    return null;
  }
  const roles = getUserRoles(rawUser);
  const kyTuDaiDien = rawUser.kyTuDaiDien || getAvatarInitial(rawUser);

  return {
    ...rawUser,
    roles,
    vaiTro: roles,
    kyTuDaiDien,
  };
}

export function normalizeAuthPayload(apiResponse) {
  const root =
    apiResponse?.data && typeof apiResponse.data === 'object' ? apiResponse.data : apiResponse;
  const payload =
    root?.data && typeof root.data === 'object' && !root.token && !root.accessToken
      ? root.data
      : root;

  const token =
    payload?.token ||
    payload?.accessToken ||
    apiResponse?.token ||
    apiResponse?.accessToken ||
    null;
  const rawUser =
    payload?.taiKhoan ||
    payload?.user ||
    payload?.account ||
    apiResponse?.taiKhoan ||
    apiResponse?.user ||
    null;
  const topLevelRoles = extractRoleList(
    payload?.roles ?? payload?.vaiTro ?? payload?.role ?? apiResponse?.roles ?? apiResponse?.vaiTro,
  );

  let user = enrichUser(rawUser);
  if (user && user.roles.length === 0 && topLevelRoles.length > 0) {
    user = { ...user, roles: topLevelRoles, vaiTro: topLevelRoles };
  } else if (!user && topLevelRoles.length > 0) {
    user = enrichUser({ roles: topLevelRoles });
  }

  return {
    token,
    user,
    message: apiResponse?.message || payload?.message || '',
  };
}

export function extractUserFromMeResponse(apiResponse) {
  if (!apiResponse || typeof apiResponse !== 'object') {
    return null;
  }
  const inner = apiResponse.data ?? apiResponse;
  if (inner && typeof inner === 'object' && (inner.taiKhoan || inner.user || inner.account)) {
    return enrichUser(inner.taiKhoan || inner.user || inner.account);
  }
  return enrichUser(inner);
}
