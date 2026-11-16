import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNhanVien } from '../../../api/nhanVienApi';
import useAuth from '../../../hooks/useAuth';
import { NHAN_VIEN_QUERY_KEY } from '../constants/nhanVienConstants';
import { validateAll, validateField } from '../utils/themNhanVienValidation';

export const INITIAL_FORM = {
  hoTen: '',
  ngaySinh: '',
  gioiTinh: '',
  diaChi: '',
  soDienThoai: '',
  email: '',
  chucVu: '',
  laAdmin: '',
};

export default function useThemNhanVienForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAuth();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState('');

  const mutation = useMutation({
    mutationFn: (payload) => createNhanVien(payload),
    onSuccess: async (response) => {
      const created = response?.data;
      const maNv = created?.maNv || 'Nhân viên mới';
      await queryClient.invalidateQueries({ queryKey: [NHAN_VIEN_QUERY_KEY] });
      showToast(`${maNv} đã được thêm vào hệ thống.`, 'success');
      navigate('/admin/nhan-vien');
    },
    onError: (error) => {
      const errorData = error.response?.data;
      const message =
        errorData?.message || 'Đã có lỗi xảy ra khi thêm nhân viên. Vui lòng thử lại.';

      if (errorData?.errors && Array.isArray(errorData.errors)) {
        const fieldErrors = {};
        errorData.errors.forEach((err) => {
          if (err.field) {
            fieldErrors[err.field] = err.message;
          }
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      }

      if (message.includes('Tên đăng nhập') || message.includes('Email')) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else if (message.includes('Số điện thoại')) {
        setErrors((prev) => ({ ...prev, soDienThoai: message }));
      } else {
        setGeneralError(message);
      }
    },
  });

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setGeneralError('');
  };

  const cancel = () => {
    navigate('/admin/nhan-vien');
  };

  const submitForm = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const allTouched = Object.keys(INITIAL_FORM).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setGeneralError('');

    const cleanPhone =
      typeof formData.soDienThoai === 'string' ? formData.soDienThoai.replace(/\s+/g, '') : '';

    const payload = {
      hoTen: formData.hoTen.trim(),
      ngaySinh: formData.ngaySinh,
      gioiTinh: formData.gioiTinh,
      diaChi: formData.diaChi.trim(),
      soDienThoai: cleanPhone,
      email: formData.email.trim(),
      chucVu: formData.chucVu,
      laAdmin: formData.laAdmin === true || formData.laAdmin === 'true',
    };

    mutation.mutate(payload);
  };

  return {
    formData,
    errors,
    touched,
    isSubmitting: mutation.isPending,
    generalError,
    setField,
    handleBlur,
    resetForm,
    cancel,
    submitForm,
  };
}
