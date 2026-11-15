export const SET_PASSWORD_INITIAL_VALUES = {
  matKhau: '',
  xacNhanMatKhau: '',
};

export function validateForgotPasswordUsername(value) {
  if (!String(value || '').trim()) {
    return 'Vui lòng nhập tên đăng nhập';
  }
  return '';
}

export function validateSetPasswordField(name, value, allValues = {}) {
  const raw = typeof value === 'string' ? value : '';

  if (name === 'matKhau') {
    if (!raw.trim()) {
      return 'Vui lòng nhập mật khẩu';
    }
    if (raw.length < 8 || raw.length > 64) {
      return 'Mật khẩu từ 8 đến 64 ký tự';
    }
    return '';
  }

  if (name === 'xacNhanMatKhau') {
    if (!raw.trim()) {
      return 'Vui lòng xác nhận mật khẩu';
    }
    if (allValues.matKhau && raw !== allValues.matKhau) {
      return 'Xác nhận mật khẩu không khớp';
    }
    return '';
  }

  return '';
}

export function validateSetPasswordForm(values) {
  const errors = {};
  ['matKhau', 'xacNhanMatKhau'].forEach((field) => {
    const message = validateSetPasswordField(field, values[field], values);
    if (message) {
      errors[field] = message;
    }
  });
  return errors;
}

export function resolveSetPasswordError(responseData) {
  const backendErrors = responseData?.errors;
  if (Array.isArray(backendErrors) && backendErrors.length > 0) {
    const fieldErrors = {};
    const bannerMessages = [];
    backendErrors.forEach((item) => {
      if (item?.field === 'matKhau' && item?.message) {
        fieldErrors.matKhau = item.message;
      } else if (item?.message) {
        bannerMessages.push(item.message);
      }
    });
    return {
      fieldErrors,
      bannerError: bannerMessages.join('. '),
    };
  }

  return {
    fieldErrors: {},
    bannerError: responseData?.message || 'Không thể đặt mật khẩu lúc này. Vui lòng thử lại.',
  };
}
