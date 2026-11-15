export const THONG_BAO_FIELDS = ['ngay', 'tenThongBao', 'noiDung'];

export const EMPTY_THONG_BAO_FORM = { ngay: '', tenThongBao: '', noiDung: '' };

export const REQUIRED_MESSAGE = 'Chưa nhập đủ thông tin cần thiết';

const MAX_LENGTH = { tenThongBao: 255, noiDung: 5000 };
const MAX_LENGTH_MESSAGE = {
  tenThongBao: 'Tên thông báo tối đa 255 ký tự',
  noiDung: 'Nội dung thông báo tối đa 5000 ký tự',
};

export function validateField(name, value) {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) return REQUIRED_MESSAGE;
  if (MAX_LENGTH[name] && text.length > MAX_LENGTH[name]) return MAX_LENGTH_MESSAGE[name];
  return '';
}

export function validateForm(values) {
  return THONG_BAO_FIELDS.reduce((errors, name) => {
    const message = validateField(name, values[name]);
    return message ? { ...errors, [name]: message } : errors;
  }, {});
}

export function buildPayload(values) {
  return {
    ngay: values.ngay,
    tenThongBao: values.tenThongBao.trim(),
    noiDung: values.noiDung.trim(),
  };
}

export function mapServerErrors(responseErrors) {
  const fieldErrors = {};
  (Array.isArray(responseErrors) ? responseErrors : []).forEach((item) => {
    if (THONG_BAO_FIELDS.includes(item?.field) && item.message && !fieldErrors[item.field]) {
      fieldErrors[item.field] = item.message;
    }
  });
  return fieldErrors;
}
