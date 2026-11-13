import { useState } from 'react';
import {
  EDITABLE_FIELDS,
  buildProfileFormValues,
  validateAllProfileFields,
  validateProfileField,
} from '../utils/profileValidation';

export default function useSuaThongTinForm({ profile, onSubmitProfile, onShowToast }) {
  const [values, setValues] = useState(() => buildProfileFormValues(profile));
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerError('');
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (name, value) => {
    const message = validateProfileField(name, value);
    setErrors((prev) => {
      if (!message) {
        if (!prev[name]) return prev;
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return { ...prev, [name]: message };
    });
  };

  const handleReset = () => {
    setValues(buildProfileFormValues(profile));
    setErrors({});
    setServerError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAllProfileFields(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError('');
      return;
    }

    setErrors({});
    setServerError('');

    const payload = {
      hoTen: values.hoTen.trim(),
      ngaySinh: values.ngaySinh,
      gioiTinh: values.gioiTinh,
      diaChi: values.diaChi.trim(),
      soDienThoai: values.soDienThoai.trim(),
      email: values.email.trim(),
    };

    try {
      const responseData = await onSubmitProfile(payload);
      if (onShowToast) {
        onShowToast(responseData?.message || 'Cập nhật thông tin cá nhân thành công', 'success');
      }
    } catch (error) {
      const responseData = error?.response?.data;
      const backendErrors = responseData?.errors;

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        const mappedErrors = {};
        const unmatched = [];
        backendErrors.forEach((item) => {
          if (item?.field && EDITABLE_FIELDS.includes(item.field)) {
            mappedErrors[item.field] = item.message;
          } else if (item?.message) {
            unmatched.push(item.message);
          }
        });
        if (Object.keys(mappedErrors).length > 0) {
          setErrors(mappedErrors);
        }
        if (unmatched.length > 0) {
          setServerError(unmatched.join('. '));
        }
        return;
      }

      const fallbackMessage =
        responseData?.message || 'Không thể cập nhật thông tin cá nhân lúc này';
      setServerError(fallbackMessage);
    }
  };

  const errorCount = Object.keys(errors).length;

  return {
    values,
    errors,
    errorCount,
    serverError,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
  };
}
