import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../../api/authApi';
import { validateForgotPasswordUsername } from '../utils/passwordRecoveryValidation';

export default function useForgotPasswordForm() {
  const location = useLocation();
  const initialUsername =
    typeof location.state?.tenDangNhap === 'string' ? location.state.tenDangNhap : '';

  const [tenDangNhap, setTenDangNhap] = useState(initialUsername);
  const [fieldError, setFieldError] = useState('');
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const mutation = useMutation({
    mutationFn: forgotPassword,
  });

  const handleChange = (value) => {
    setTenDangNhap(value);
    setServerError('');
    if (fieldError) {
      setFieldError('');
    }
  };

  const handleBlur = (value) => {
    setFieldError(validateForgotPasswordUsername(value));
  };

  const handleTryAnother = () => {
    setSuccessMessage('');
    setServerError('');
    setFieldError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorMessage = validateForgotPasswordUsername(tenDangNhap);
    if (errorMessage) {
      setFieldError(errorMessage);
      setServerError('');
      return;
    }

    setFieldError('');
    setServerError('');

    try {
      const responseData = await mutation.mutateAsync({
        tenDangNhap: tenDangNhap.trim(),
      });
      setSuccessMessage(
        responseData?.message ||
          'Nếu tài khoản tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi tới email',
      );
    } catch (error) {
      const responseData = error?.response?.data;
      const backendErrors = responseData?.errors;
      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        const usernameErr = backendErrors.find((item) => item?.field === 'tenDangNhap');
        if (usernameErr?.message) {
          setFieldError(usernameErr.message);
          return;
        }
      }
      setServerError(
        responseData?.message ||
          'Không thể gửi yêu cầu đặt lại mật khẩu lúc này. Vui lòng thử lại.',
      );
    }
  };

  return {
    tenDangNhap,
    fieldError,
    serverError,
    successMessage,
    isSubmitting: mutation.isPending,
    handleChange,
    handleBlur,
    handleTryAnother,
    handleSubmit,
  };
}
