import { useState } from 'react';
import {
  buildPayload,
  mapServerErrors,
  validateField,
  validateForm,
} from '../utils/thongBaoValidation';

export default function useThongBaoForm({
  initialValues,
  mutation,
  buildMutationInput = undefined,
  onSuccess,
  onError,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const changeField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const blurField = (name) => {
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name]) }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const submit = () => {
    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = buildPayload(values);
    mutation.mutate(buildMutationInput ? buildMutationInput(payload) : payload, {
      onSuccess,
      onError: (error) => {
        const response = error?.response?.data;
        const serverErrors = mapServerErrors(response?.errors);
        if (Object.keys(serverErrors).length > 0) {
          setErrors(serverErrors);
          return;
        }
        onError(response?.message || 'Không thể lưu thông báo lúc này. Vui lòng thử lại.');
      },
    });
  };

  return { values, errors, changeField, blurField, reset, submit };
}
