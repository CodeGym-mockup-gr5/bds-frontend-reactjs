import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
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

export default function useSuaNhanVienForm({ employee, onSuccess, onCancel, onErrorToast }) {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');

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

  const submitForm = async (e) => {
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

    setIsSubmitting(true);
    setGeneralError('');

    try {
      const payload = {
        hoTen: formData.hoTen.trim(),
        ngaySinh: formData.ngaySinh,
        gioiTinh: formData.gioiTinh,
        diaChi: formData.diaChi.trim(),
        soDienThoai: formData.soDienThoai.trim(),
        email: formData.email.trim(),
        chucVu: formData.chucVu,
        laAdmin: formData.laAdmin === true || formData.laAdmin === 'true',
      };

      const response = await updateNhanVien(employee.id, payload);
      await queryClient.invalidateQueries({ queryKey: [NHAN_VIEN_QUERY_KEY] });

      onSuccess?.(response?.data || { ...payload, maNv: formData.maNv });
    } catch (error) {
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
        const emailMsg = 'Email này đã được sử dụng bởi nhân viên khác.';
        setErrors((prev) => ({ ...prev, email: emailMsg }));
        onErrorToast?.(emailMsg);
      } else if (message.toLowerCase().includes('số điện thoại')) {
        const phoneMsg = 'Số điện thoại này đã được sử dụng.';
        setErrors((prev) => ({ ...prev, soDienThoai: phoneMsg }));
        onErrorToast?.(phoneMsg);
      } else {
        setGeneralError(message);
        onErrorToast?.(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    generalError,
    setField,
    handleBlur,
    onCancel,
    submitForm,
  };
}
