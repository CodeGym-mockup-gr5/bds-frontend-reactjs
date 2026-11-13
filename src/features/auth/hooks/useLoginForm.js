import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import {
  getRememberedUsername,
  removeRememberedUsername,
  setRememberedUsername,
} from '../../../utils/auth';

function validateLoginField(name, value) {
  if (name === 'tenDangNhap' && !String(value || '').trim()) {
    return 'Xin mời nhập tên đăng nhập';
  }
  if (name === 'matKhau' && !String(value || '').trim()) {
    return 'Xin mời nhập mật khẩu';
  }
  return '';
}

export default function useLoginForm(onSuccess = null) {
  const { loginMutation } = useAuth();

  const [tenDangNhap, setTenDangNhap] = useState(() => getRememberedUsername());
  const [matKhau, setMatKhau] = useState('');
  const [rememberMe, setRememberMe] = useState(() => Boolean(getRememberedUsername()));
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ tenDangNhap: '', matKhau: '' });
  const [generalError, setGeneralError] = useState('');
  const [hasAuthError, setHasAuthError] = useState(false);

  const handleFieldChange = (name, value) => {
    if (name === 'tenDangNhap') {
      setTenDangNhap(value);
    } else {
      setMatKhau(value);
    }

    setGeneralError('');
    setHasAuthError(false);
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFieldBlur = (name, value) => {
    const errorMessage = validateLoginField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const usernameError = validateLoginField('tenDangNhap', tenDangNhap);
    const passwordError = validateLoginField('matKhau', matKhau);

    if (usernameError || passwordError) {
      setFieldErrors({ tenDangNhap: usernameError, matKhau: passwordError });
      return;
    }

    setGeneralError('');
    setHasAuthError(false);

    const trimmedUsername = tenDangNhap.trim();
    loginMutation.mutate(
      { tenDangNhap: trimmedUsername, matKhau },
      {
        onSuccess: (responseData) => {
          if (rememberMe) {
            setRememberedUsername(trimmedUsername);
          } else {
            removeRememberedUsername();
          }
          if (onSuccess) {
            onSuccess(responseData);
          }
        },
        onError: (error) => {
          const responseData = error?.response?.data;
          const backendErrors = responseData?.errors;

          if (Array.isArray(backendErrors) && backendErrors.length > 0) {
            const nextFieldErrors = { tenDangNhap: '', matKhau: '' };
            const otherErrors = [];

            backendErrors.forEach((item) => {
              if (item?.field === 'tenDangNhap' || item?.field === 'matKhau') {
                nextFieldErrors[item.field] = item.message;
              } else if (item?.message) {
                otherErrors.push(item.message);
              }
            });

            setFieldErrors(nextFieldErrors);
            if (otherErrors.length > 0) {
              setGeneralError(otherErrors.join('. '));
            }
            return;
          }

          setGeneralError(
            responseData?.message || 'Không thể đăng nhập lúc này. Vui lòng thử lại.',
          );
          if (error?.response?.status === 401 || error?.response?.status === 403) {
            setHasAuthError(true);
          }
        },
      },
    );
  };

  return {
    tenDangNhap,
    matKhau,
    rememberMe,
    setRememberMe,
    showPassword,
    toggleShowPassword,
    fieldErrors,
    generalError,
    hasAuthError,
    isSubmitting: loginMutation.isPending,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  };
}
