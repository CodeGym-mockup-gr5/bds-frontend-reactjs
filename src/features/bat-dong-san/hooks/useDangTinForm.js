import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createBatDongSan } from '../../../api/batDongSanApi';
import useAuth from '../../../hooks/useAuth';
import mapDangTinServerErrors from '../utils/mapDangTinServerErrors';
import {
  INITIAL_VALUES,
  buildPayload,
  normalizePriceInput,
  validateField,
  validateImages,
  validateValues,
} from '../utils/dangTinValidation';

const SUCCESS_MESSAGE = 'Đăng tin thành công.';
const FALLBACK_ERROR = 'Không thể đăng tin lúc này. Vui lòng thử lại.';
const SUCCESS_REDIRECT = '/';
const INVALID_SELECTOR = '[aria-invalid="true"], [data-invalid="true"]';

export default function useDangTinForm({ images, canSubmit, onForbidden = null }) {
  const navigate = useNavigate();
  const { showToast } = useAuth();
  const formRef = useRef(null);
  const serverErrorFieldsRef = useRef(new Set());
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isImageCheckActive, setIsImageCheckActive] = useState(false);
  const [serverImageError, setServerImageError] = useState('');
  const mutation = useMutation({ mutationFn: createBatDongSan });

  const setFieldError = (name, message) => {
    setErrors((prev) => {
      if (!message && !prev[name]) return prev;
      const next = { ...prev };
      if (message) {
        next[name] = message;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const focusFirstInvalid = () => {
    requestAnimationFrame(() => {
      const target = formRef.current?.querySelector(INVALID_SELECTOR);
      target?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      target?.focus({ preventScroll: true });
    });
  };

  const handleChange = (name, rawValue) => {
    const value = name === 'gia' ? normalizePriceInput(rawValue) : rawValue;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    serverErrorFieldsRef.current.delete(name);
    if (errors[name]) {
      setFieldError(name, validateField(name, nextValues));
    }
  };

  const handleBlur = (name) => {
    const message = validateField(name, values);
    if (!message && serverErrorFieldsRef.current.has(name)) return;
    setFieldError(name, message);
  };

  const handleServerError = (error) => {
    const response = error?.response;
    const { fieldErrors, imageError, unmatched } = mapDangTinServerErrors(response?.data?.errors);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;

    if (response?.status === 403 && onForbidden) onForbidden();

    if (hasFieldErrors) {
      serverErrorFieldsRef.current = new Set(Object.keys(fieldErrors));
      setErrors(fieldErrors);
    }
    if (imageError) setServerImageError(imageError);
    if (hasFieldErrors || imageError) focusFirstInvalid();

    if (unmatched.length > 0) {
      showToast(unmatched.join('. '), 'error');
    } else if (!hasFieldErrors && !imageError) {
      const canUseServerMessage = response && response.status < 500 && response.data?.message;
      showToast(canUseServerMessage ? response.data.message : FALLBACK_ERROR, 'error');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit || mutation.isPending) return;

    const nextErrors = validateValues(values);
    const imageMessage = validateImages(images);
    setErrors(nextErrors);
    serverErrorFieldsRef.current = new Set();
    setIsImageCheckActive(true);
    setServerImageError('');

    if (Object.keys(nextErrors).length > 0 || imageMessage) {
      focusFirstInvalid();
      return;
    }

    mutation.mutate(buildPayload(values, images), {
      onSuccess: () => {
        showToast(SUCCESS_MESSAGE, 'success');
        navigate(SUCCESS_REDIRECT);
      },
      onError: handleServerError,
    });
  };

  const handleCancel = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const imageError = serverImageError || (isImageCheckActive ? validateImages(images) : '');

  return {
    formRef,
    values,
    errors,
    imageError,
    isSubmitting: mutation.isPending,
    handleChange,
    handleBlur,
    handleSubmit,
    handleCancel,
  };
}
