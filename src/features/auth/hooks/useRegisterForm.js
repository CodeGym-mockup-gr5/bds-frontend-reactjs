import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const INITIAL_VALUES = {
  hoTen: '',
  tenDangNhap: '',
  soDienThoai: '',
  email: '',
  soCccd: '',
  matKhau: '',
  xacNhanMatKhau: '',
  muonDangTinBan: false,
};

const INITIAL_ERRORS = {
  hoTen: '',
  tenDangNhap: '',
  soDienThoai: '',
  email: '',
  soCccd: '',
  matKhau: '',
  xacNhanMatKhau: '',
};

const PHONE_REGEX = /^0[0-9]{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CCCD_REGEX = /^[0-9]{12}$/;
const USERNAME_REGEX = /^[A-Za-z0-9._-]+$/;

function validateRegisterField(name, value, values) {
  const raw = typeof value === 'string' ? value : '';
  const trimmed = raw.trim();

  if (name === 'hoTen') {
    if (!trimmed) return 'Vui lòng nhập họ tên';
    if (trimmed.length > 45) return 'Họ tên tối đa 45 ký tự';
    return '';
  }

  if (name === 'tenDangNhap') {
    if (!trimmed) return 'Vui lòng nhập tên đăng nhập';
    if (trimmed.length < 4 || trimmed.length > 50) return 'Tên đăng nhập từ 4 đến 50 ký tự';
    if (!USERNAME_REGEX.test(trimmed)) {
      return 'Tên đăng nhập chỉ gồm chữ, số, dấu chấm, gạch ngang, gạch dưới';
    }
    return '';
  }

  if (name === 'soDienThoai') {
    if (!trimmed) return 'Vui lòng nhập số điện thoại';
    if (!PHONE_REGEX.test(trimmed)) return 'Số điện thoại không hợp lệ';
    return '';
  }

  if (name === 'email') {
    if (!trimmed) return 'Vui lòng nhập email';
    if (trimmed.length > 254) return 'Email tối đa 254 ký tự';
    if (!EMAIL_REGEX.test(trimmed)) return 'Email không hợp lệ';
    return '';
  }

  if (name === 'soCccd') {
    if (!trimmed) return '';
    if (!CCCD_REGEX.test(trimmed)) return 'Số CCCD gồm đúng 12 chữ số';
    return '';
  }

  if (name === 'matKhau') {
    if (!trimmed) return 'Vui lòng nhập mật khẩu';
    if (raw.length < 8 || raw.length > 64) return 'Mật khẩu từ 8 đến 64 ký tự';
    return '';
  }

  if (name === 'xacNhanMatKhau') {
    if (!trimmed) return 'Vui lòng xác nhận mật khẩu';
    if (raw !== values.matKhau) return 'Mật khẩu xác nhận không khớp';
    return '';
  }

  return '';
}

function mapConflictMessageToField(message) {
  if (message.includes('Tên đăng nhập')) return 'tenDangNhap';
  if (message.includes('Số CCCD')) return 'soCccd';
  if (message.includes('Email')) return 'email';
  return null;
}

export default function useRegisterForm(onRegistered = null) {
  const {
    registerMutation,
    loginMutation,
    handleLoginSuccess,
    closeRegisterModal,
    openLoginModal,
    showToast,
  } = useAuth();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState(INITIAL_ERRORS);
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false);

  const handleFieldChange = (name, nextValue) => {
    setValues((prev) => ({ ...prev, [name]: nextValue }));
    setGeneralError('');
    setFieldErrors((prev) => {
      if (!prev[name] && !(name === 'matKhau' && prev.xacNhanMatKhau)) {
        return prev;
      }
      const next = { ...prev, [name]: '' };
      if (name === 'matKhau' && prev.xacNhanMatKhau && nextValue === values.xacNhanMatKhau) {
        next.xacNhanMatKhau = '';
      }
      return next;
    });
  };

  const handleFieldBlur = (name, currentValue) => {
    const errorMessage = validateRegisterField(name, currentValue, values);
    setFieldErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = { ...INITIAL_ERRORS };
    let hasClientError = false;
    Object.keys(INITIAL_ERRORS).forEach((field) => {
      const msg = validateRegisterField(field, values[field], values);
      nextErrors[field] = msg;
      if (msg) hasClientError = true;
    });

    if (hasClientError) {
      setFieldErrors(nextErrors);
      return;
    }

    setGeneralError('');
    const payload = {
      hoTen: values.hoTen.trim(),
      tenDangNhap: values.tenDangNhap.trim(),
      soDienThoai: values.soDienThoai.trim(),
      email: values.email.trim(),
      soCccd: values.soCccd.trim() ? values.soCccd.trim() : null,
      matKhau: values.matKhau,
      muonDangTinBan: Boolean(values.muonDangTinBan),
    };

    try {
      const registerRes = await registerMutation.mutateAsync(payload);
      const isChoDuyet =
        payload.muonDangTinBan || registerRes?.data?.trangThaiDuyet === 'CHO_DUYET';
      const successMessage = isChoDuyet
        ? 'Đăng ký thành công. Tài khoản đang chờ Admin duyệt để đăng tin bán'
        : registerRes?.message || 'Đăng ký tài khoản thành công';

      setIsAutoLoggingIn(true);
      try {
        const loginRes = await loginMutation.mutateAsync({
          tenDangNhap: payload.tenDangNhap,
          matKhau: payload.matKhau,
        });
        closeRegisterModal();
        handleLoginSuccess(loginRes, null, successMessage);
        if (onRegistered) onRegistered(loginRes);
      } catch {
        closeRegisterModal();
        openLoginModal();
        showToast('Đăng ký tài khoản thành công. Vui lòng đăng nhập.', 'success');
      } finally {
        setIsAutoLoggingIn(false);
      }
    } catch (error) {
      const status = error?.response?.status;
      const responseData = error?.response?.data;
      const backendErrors = responseData?.errors;

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        const serverFieldErrors = { ...INITIAL_ERRORS };
        const otherErrors = [];

        backendErrors.forEach((item) => {
          if (item?.field && Object.hasOwn(serverFieldErrors, item.field)) {
            serverFieldErrors[item.field] = item.message;
          } else if (item?.message) {
            otherErrors.push(item.message);
          }
        });

        setFieldErrors(serverFieldErrors);
        if (otherErrors.length > 0) {
          setGeneralError(otherErrors.join('. '));
        }
        return;
      }

      const message = responseData?.message || 'Không thể đăng ký lúc này. Vui lòng thử lại.';
      if (status === 409) {
        const conflictField = mapConflictMessageToField(message);
        if (conflictField) {
          setFieldErrors((prev) => ({ ...prev, [conflictField]: message }));
          return;
        }
      }

      setGeneralError(message);
    }
  };

  return {
    values,
    fieldErrors,
    generalError,
    showPassword,
    showConfirmPassword,
    toggleShowPassword: () => setShowPassword((prev) => !prev),
    toggleShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
    isSubmitting: registerMutation.isPending || isAutoLoggingIn,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  };
}
