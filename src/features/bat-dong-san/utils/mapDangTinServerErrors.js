import { FORM_FIELDS } from './dangTinValidation';

const IMAGE_FIELD_PREFIX = 'danhSachHinhAnh';

export default function mapDangTinServerErrors(responseErrors) {
  const fieldErrors = {};
  const unmatched = [];
  let imageError = '';

  (Array.isArray(responseErrors) ? responseErrors : []).forEach((item) => {
    const field = typeof item?.field === 'string' ? item.field : '';
    const message = item?.message;
    if (!message) return;
    if (field.startsWith(IMAGE_FIELD_PREFIX)) {
      imageError = imageError || message;
    } else if (FORM_FIELDS.includes(field)) {
      fieldErrors[field] = fieldErrors[field] || message;
    } else {
      unmatched.push(message);
    }
  });

  return { fieldErrors, imageError, unmatched };
}
