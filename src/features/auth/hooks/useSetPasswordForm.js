import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { setPassword } from '../../../api/authApi';
import useAuth from '../../../hooks/useAuth';
import {
  SET_PASSWORD_INITIAL_VALUES,
  resolveSetPasswordError,
  validateSetPasswordField,
  validateSetPasswordForm,
} from '../utils/passwordRecoveryValidation';

const INITIAL_VISIBILITY = {
  matKhau: false,
  xacNhanMatKhau: false,
};

export default function useSetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useAuth();

  const token = (searchParams.get('token') || '').trim();
  const hasToken = Boolean(token);

  const [values, setValues] = useState(SET_PASSWORD_INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [visibility, setVisibility] = useState(INITIAL_VISIBILITY);

  const mutation = useMutation({
    mutationFn: setPassword,
  });

  const handleToggleVisibility = (fieldName) => {
    setVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerError('');
    setErrors((prev) => {
      if (!prev[name] && !(name === 'matKhau' && prev.xacNhanMatKhau)) {
        return prev;
      }
      const next = { ...prev };
      delete next[name];
      if (name === 'matKhau' && next.xacNhanMatKhau) {
        delete next.xacNhanMatKhau;
      }
      return next;
    });
  };

  const handleBlur = (name, value) => {
    const nextValues = { ...values, [name]: value };
    const message = validateSetPasswordField(name, value, nextValues);
    setErrors((prev) => {
      const next = { ...prev };
      if (!message) {
        delete next[name];
      } else {
        next[name] = message;
      }
      if (name === 'matKhau' && nextValues.xacNhanMatKhau) {
        const confirmMsg = validateSetPasswordField(
          'xacNhanMatKhau',
          nextValues.xacNhanMatKhau,
          nextValues,
        );
        if (confirmMsg) {
          next.xacNhanMatKhau = confirmMsg;
        } else {
          delete next.xacNhanMatKhau;
        }
      }
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!hasToken) {
      return;
    }

    const validationErrors = validateSetPasswordForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError('');
      return;
    }

    setErrors({});
    setServerError('');

    try {
      const responseData = await mutation.mutateAsync({
        token,
        matKhau: values.matKhau,
      });
      showToast(responseData?.message || 'Đặt mật khẩu thành công', 'success');
      navigate('/dang-nhap', { replace: true });
    } catch (error) {
      const { fieldErrors, bannerError } = resolveSetPasswordError(error?.response?.data);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      }
      if (bannerError) {
        setServerError(bannerError);
      }
    }
  };

  return {
    hasToken,
    values,
    errors,
    serverError,
    visibility,
    isSubmitting: mutation.isPending,
    handleToggleVisibility,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
