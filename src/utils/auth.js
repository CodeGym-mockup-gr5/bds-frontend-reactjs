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
  if (!rawUser || typeof rawUser !== 'object') {
    return null;
  }
  const roles = getUserRoles(rawUser);
  const kyTuDaiDien =
    rawUser.kyTuDaiDien ||
    getInitials(
      rawUser.hoTen || rawUser.fullName || rawUser.name,
      rawUser.tenDangNhap || rawUser.username,
    );

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
