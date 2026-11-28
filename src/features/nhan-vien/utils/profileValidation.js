const NAME_REGEX = /^[\p{L} ]+$/u;
const CCCD_REGEX = /^\d{12}$/;

export const EDITABLE_FIELDS = ['hoTen', 'ngaySinh', 'gioiTinh', 'diaChi'];

export function canEditKhachHangCccd(profile, isKhachHang = false) {
  return Boolean(isKhachHang && !String(profile?.soCccd || '').trim());
}

export function getEditableFields(isKhachHang = false, canEditCccd = false) {
  return isKhachHang && canEditCccd ? [...EDITABLE_FIELDS, 'soCccd'] : EDITABLE_FIELDS;
}

export function buildProfileFormValues(profile, { isKhachHang = false } = {}) {
  const base = {
    hoTen: profile?.hoTen || '',
    ngaySinh: profile?.ngaySinh || '',
    gioiTinh: profile?.gioiTinh || '',
    diaChi: profile?.diaChi || '',
  };
  if (isKhachHang) {
    base.soCccd = profile?.soCccd || '';
  }
  return base;
}

function isPastDate(dateText) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateText || '').trim());
  if (!match) {
    return false;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const inputDate = new Date(year, month - 1, day);
  const isValidDate =
    inputDate.getFullYear() === year &&
    inputDate.getMonth() === month - 1 &&
    inputDate.getDate() === day;
  if (!isValidDate) {
    return false;
  }
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return inputDate < today;
}

export function validateProfileField(name, value, { isKhachHang = false } = {}) {
  const text = typeof value === 'string' ? value.trim() : '';

  if (name === 'hoTen') {
    if (!text) return 'Xin mời nhập đầy đủ thông tin';
    if (text.length > 45) return 'Họ và tên tối đa 45 ký tự';
    if (!NAME_REGEX.test(text)) return 'Họ và tên không được chứa ký tự đặc biệt';
    return '';
  }

  if (name === 'ngaySinh') {
    if (!text) return isKhachHang ? '' : 'Xin mời nhập đầy đủ thông tin';
    if (!isPastDate(text)) return 'Ngày sinh phải trong quá khứ';
    return '';
  }

  if (name === 'gioiTinh') {
    if (!text) return isKhachHang ? '' : 'Xin mời nhập đầy đủ thông tin';
    if (text !== 'NAM' && text !== 'NU') return 'Xin mời nhập đầy đủ thông tin';
    return '';
  }

  if (name === 'diaChi') {
    if (!text) return isKhachHang ? '' : 'Xin mời nhập đầy đủ thông tin';
    if (text.length > 255) return 'Địa chỉ tối đa 255 ký tự';
    return '';
  }

  if (name === 'soCccd') {
    if (!text) return '';
    if (!CCCD_REGEX.test(text)) return 'Số CCCD gồm đúng 12 chữ số';
    return '';
  }

  return '';
}

export function validateAllProfileFields(
  values,
  { isKhachHang = false, canEditCccd = false } = {},
) {
  const errors = {};
  getEditableFields(isKhachHang, canEditCccd).forEach((field) => {
    const message = validateProfileField(field, values[field], { isKhachHang });
    if (message) {
      errors[field] = message;
    }
  });
  return errors;
}
