import { useEffect } from 'react';
import ThemNhanVienForm from '../components/ThemNhanVienForm';
import useThemNhanVienForm from '../hooks/useThemNhanVienForm';
import scrollToTop from '../../../utils/scrollUtils';
import styles from './ThemNhanVienPage.module.css';

export default function ThemNhanVienPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  const {
    formData,
    errors,
    touched,
    isSubmitting,
    generalError,
    setField,
    handleBlur,
    resetForm,
    cancel,
    submitForm,
  } = useThemNhanVienForm();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Thêm mới nhân viên</h1>
      </header>

      <ThemNhanVienForm
        formData={formData}
        errors={errors}
        touched={touched}
        isSubmitting={isSubmitting}
        generalError={generalError}
        setField={setField}
        handleBlur={handleBlur}
        resetForm={resetForm}
        cancel={cancel}
        submitForm={submitForm}
      />
    </div>
  );
}
