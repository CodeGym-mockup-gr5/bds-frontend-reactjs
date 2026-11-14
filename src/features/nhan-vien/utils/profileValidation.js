const NAME_REGEX = /^[\p{L} ]+$/u;
const PHONE_REGEX = /^0\d{9}$/;
const DIGITS_ONLY_REGEX = /^\d+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EDITABLE_FIELDS = ['hoTen', 'ngaySinh', 'gioiTinh', 'diaChi', 'soDienThoai', 'email'];

export function buildProfileFormValues(profile) {
  return {
    hoTen: profile?.hoTen || '',
    ngaySinh: profile?.ngaySinh || '',
    gioiTinh: profile?.gioiTinh || '',
    diaChi: profile?.diaChi || '',
    soDienThoai: profile?.soDienThoai || '',
    email: profile?.email || '',
  };
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

export function validateProfileField(name, value) {
  const text = typeof value === 'string' ? value.trim() : '';

  if (name === 'hoTen') {
    if (!text) return 'Xin mời nhập đầy đủ thông tin';
    if (text.length > 45) return 'Họ và tên tối đa 45 ký tự';
    if (!NAME_REGEX.test(text)) return 'Họ và tên không được chứa ký tự đặc biệt';
    return '';
  }

  if (name === 'ngaySinh') {
    if (!text) return 'Xin mời nhập đầy đủ thông tin';
    if (!isPastDate(text)) return 'Ngày sinh phải trong quá khứ';
    return '';
  }

  if (name === 'gioiTinh') {
    if (text !== 'NAM' && text !== 'NU') return 'Xin mời nhập đầy đủ thông tin';
    return '';
  }

  if (name === 'diaChi') {
    if (!text) return 'Xin mời nhập đầy đủ thông tin';
    if (text.length > 255) return 'Địa chỉ tối đa 255 ký tự';
    return '';
  }

  if (name === 'soDienThoai') {
    if (!text) return 'Xin mời nhập đầy đủ thông tin';
    if (!DIGITS_ONLY_REGEX.test(text)) return 'Chỉ được chứa chữ số';
    if (!PHONE_REGEX.test(text)) return 'Số điện thoại không hợp lệ';
    return '';
  }

  if (name === 'email') {
    if (!text) return 'Xin mời nhập đầy đủ thông tin';
    if (text.length > 254) return 'Email tối đa 254 ký tự';
    if (!EMAIL_REGEX.test(text)) return 'Email không hợp lệ!';
    return '';
  }

  return '';
}

export function validateAllProfileFields(values) {
  const errors = {};
  EDITABLE_FIELDS.forEach((field) => {
    const message = validateProfileField(field, values[field]);
    if (message) {
      errors[field] = message;
    }
  });
  return errors;
}
