import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNhanVien } from '../../../api/nhanVienApi';
import { NHAN_VIEN_QUERY_KEY } from '../constants/nhanVienConstants';
import { validateAll, validateField } from '../utils/suaNhanVienValidation';

function toInputDate(val) {
  if (!val) return '';
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
    return val;
  }
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function useSuaNhanVienForm({ employee, onSuccess, onCancel }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    maNv: employee?.maNv || '',
    hoTen: employee?.hoTen || '',
    ngaySinh: toInputDate(employee?.ngaySinh),
    gioiTinh: employee?.gioiTinh || 'NAM',
    diaChi: employee?.diaChi || '',
    soDienThoai: employee?.soDienThoai || '',
    email: employee?.email || '',
    chucVu: employee?.chucVu || 'TRUONG_PHONG',
    laAdmin: employee?.laAdmin ?? false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState('');

  const mutation = useMutation({
    mutationFn: (payload) => updateNhanVien(employee.id, payload),
    onSuccess: async (response, payload) => {
      await queryClient.invalidateQueries({ queryKey: [NHAN_VIEN_QUERY_KEY] });
      onSuccess?.(response?.data || { ...payload, maNv: formData.maNv });
    },
    onError: (error) => {
      const errorData = error.response?.data;
      const message =
        errorData?.message || 'Đã có lỗi xảy ra khi cập nhật nhân viên. Vui lòng thử lại.';

      if (errorData?.errors && Array.isArray(errorData.errors)) {
        const fieldErrors = {};
        errorData.errors.forEach((err) => {
          if (err.field) {
            fieldErrors[err.field] = err.message;
          }
        });
        setErrors((prev) => ({ ...prev, ...fieldErrors }));
      }

      if (message.toLowerCase().includes('email')) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else if (message.toLowerCase().includes('số điện thoại')) {
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

  const submitForm = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const allFields = [
      'hoTen',
      'ngaySinh',
      'gioiTinh',
      'diaChi',
      'soDienThoai',
      'email',
      'chucVu',
      'laAdmin',
    ];
    const allTouched = allFields.reduce((acc, key) => {
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
    onCancel,
    submitForm,
  };
}
