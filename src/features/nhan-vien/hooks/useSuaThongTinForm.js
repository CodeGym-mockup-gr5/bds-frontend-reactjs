import { useState } from 'react';
import {
  buildProfileFormValues,
  getEditableFields,
  validateAllProfileFields,
  validateProfileField,
} from '../utils/profileValidation';

export default function useSuaThongTinForm({
  profile,
  isKhachHang = false,
  onSubmitProfile,
  onShowToast,
}) {
  const [values, setValues] = useState(() => buildProfileFormValues(profile, { isKhachHang }));
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
    const message = validateProfileField(name, value, { isKhachHang });
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
    setValues(buildProfileFormValues(profile, { isKhachHang }));
    setErrors({});
    setServerError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateAllProfileFields(values, { isKhachHang });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError('');
      return;
    }

    setErrors({});
    setServerError('');

    const payload = isKhachHang
      ? {
          hoTen: values.hoTen.trim(),
          ngaySinh: values.ngaySinh || null,
          gioiTinh: values.gioiTinh || null,
          diaChi: values.diaChi.trim() || null,
          soDienThoai: values.soDienThoai.trim(),
          email: values.email.trim(),
          soCccd: values.soCccd.trim() || null,
        }
      : {
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
      const editableFields = getEditableFields(isKhachHang);

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        const mappedErrors = {};
        const unmatched = [];
        backendErrors.forEach((item) => {
          if (item?.field && editableFields.includes(item.field)) {
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
      if (responseData?.message?.toLowerCase().includes('email')) {
        setErrors({ email: fallbackMessage });
        return;
      }
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
