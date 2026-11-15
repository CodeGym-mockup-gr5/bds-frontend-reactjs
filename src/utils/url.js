const ABSOLUTE_URL_PATTERN = /^(https?:)?\/\//i;

function getApiOrigin() {
  try {
    return new URL(import.meta.env.VITE_API_BASE_URL, window.location.origin).origin;
  } catch {
    return window.location.origin;
  }
}

export default function resolveAssetUrl(path) {
  if (typeof path !== 'string' || !path.trim()) {
    return '';
  }
  const value = path.trim();
  if (ABSOLUTE_URL_PATTERN.test(value) || value.startsWith('data:')) {
    return value;
  }
  const separator = value.startsWith('/') ? '' : '/';
  return `${getApiOrigin()}${separator}${value}`;
}
