export const CHANGE_PASSWORD_INITIAL_VALUES = {
  matKhauCu: '',
  matKhauMoi: '',
  xacNhanMatKhau: '',
};

export const CHANGE_PASSWORD_FIELDS = ['matKhauCu', 'matKhauMoi', 'xacNhanMatKhau'];

export function validateChangePasswordField(name, value, allValues = {}) {
  const raw = typeof value === 'string' ? value : '';

  if (name === 'matKhauCu') {
    if (!raw.trim()) {
      return 'Xin mời nhập mật khẩu cũ';
    }
    return '';
  }

  if (name === 'matKhauMoi') {
    if (!raw.trim()) {
      return 'Xin mời nhập mật khẩu mới';
    }
    if (/\s/.test(raw)) {
      return 'Mật khẩu mới không được chứa khoảng trắng';
    }
    if (raw.length < 6 || raw.length > 32) {
      return 'Mật khẩu mới phải từ 6 đến 32 ký tự';
    }
    if (allValues.matKhauCu && raw === allValues.matKhauCu) {
      return 'Mật khẩu mới không được trùng với mật khẩu cũ';
    }
    return '';
  }

  if (name === 'xacNhanMatKhau') {
    if (!raw.trim()) {
      return 'Xin mời xác nhận mật khẩu';
    }
    if (allValues.matKhauMoi && raw !== allValues.matKhauMoi) {
      return 'Mật khẩu mới phải từ 6 đến 32 ký tự và khớp nhau';
    }
    return '';
  }

  return '';
}

export function validateChangePasswordForm(values) {
  const errors = {};
  CHANGE_PASSWORD_FIELDS.forEach((field) => {
    const message = validateChangePasswordField(field, values[field], values);
    if (message) {
      errors[field] = message;
    }
  });
  return errors;
}

export function resolveBackendChangePasswordError(responseData) {
  const backendErrors = responseData?.errors;
  if (Array.isArray(backendErrors) && backendErrors.length > 0) {
    const fieldErrors = {};
    const bannerMessages = [];
    backendErrors.forEach((item) => {
      if (item?.field && CHANGE_PASSWORD_FIELDS.includes(item.field) && item?.message) {
        fieldErrors[item.field] = item.message;
      } else if (item?.message) {
        bannerMessages.push(item.message);
      }
    });
    return {
      fieldErrors,
      bannerError: bannerMessages.join('. '),
    };
  }

  const message = responseData?.message || '';
  if (message === 'Mật khẩu cũ không đúng') {
    return { fieldErrors: { matKhauCu: message }, bannerError: '' };
  }
  if (message === 'Mật khẩu mới không được trùng với mật khẩu cũ') {
    return { fieldErrors: { matKhauMoi: message }, bannerError: '' };
  }
  if (message === 'Mật khẩu mới phải từ 6 đến 32 ký tự và khớp nhau') {
    return { fieldErrors: { xacNhanMatKhau: message }, bannerError: '' };
  }

  return {
    fieldErrors: {},
    bannerError: message || 'Không thể đổi mật khẩu lúc này. Vui lòng thử lại.',
  };
}
