import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../../api/authApi';
import useAuth from '../../../hooks/useAuth';
import {
  CHANGE_PASSWORD_INITIAL_VALUES,
  resolveBackendChangePasswordError,
  validateChangePasswordField,
  validateChangePasswordForm,
} from '../utils/changePasswordValidation';

const INITIAL_VISIBILITY = {
  matKhauCu: false,
  matKhauMoi: false,
  xacNhanMatKhau: false,
};

export default function useChangePasswordForm() {
  const { showToast } = useAuth();
  const [values, setValues] = useState(CHANGE_PASSWORD_INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [visibility, setVisibility] = useState(INITIAL_VISIBILITY);

  const mutation = useMutation({
    mutationFn: changePassword,
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
      if (
        !prev[name] &&
        !(name === 'matKhauCu' && prev.matKhauMoi) &&
        !(name === 'matKhauMoi' && prev.xacNhanMatKhau)
      ) {
        return prev;
      }
      const next = { ...prev };
      delete next[name];
      if (name === 'matKhauCu' && next.matKhauMoi) {
        delete next.matKhauMoi;
      }
      if (name === 'matKhauMoi' && next.xacNhanMatKhau) {
        delete next.xacNhanMatKhau;
      }
      return next;
    });
  };

  const handleBlur = (name, value) => {
    const nextValues = { ...values, [name]: value };
    const message = validateChangePasswordField(name, value, nextValues);
    setErrors((prev) => {
      const next = { ...prev };
      if (!message) {
        delete next[name];
      } else {
        next[name] = message;
      }
      if (name === 'matKhauMoi' && nextValues.xacNhanMatKhau) {
        const confirmMsg = validateChangePasswordField(
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

  const handleReset = () => {
    setValues(CHANGE_PASSWORD_INITIAL_VALUES);
    setErrors({});
    setServerError('');
    setVisibility(INITIAL_VISIBILITY);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateChangePasswordForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (!values.matKhauCu.trim() && !values.matKhauMoi.trim()) {
        setServerError('Xin mời nhập mật khẩu mới và mật khẩu cũ');
      } else {
        setServerError('');
      }
      return;
    }

    setErrors({});
    setServerError('');

    try {
      const responseData = await mutation.mutateAsync({
        matKhauCu: values.matKhauCu,
        matKhauMoi: values.matKhauMoi,
        xacNhanMatKhau: values.xacNhanMatKhau,
      });
      handleReset();
      showToast(responseData?.message || 'Đổi mật khẩu thành công', 'success');
    } catch (error) {
      const { fieldErrors, bannerError } = resolveBackendChangePasswordError(error?.response?.data);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      }
      if (bannerError) {
        setServerError(bannerError);
      }
    }
  };

  return {
    values,
    errors,
    serverError,
    visibility,
    isSubmitting: mutation.isPending,
    handleToggleVisibility,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
  };
}
