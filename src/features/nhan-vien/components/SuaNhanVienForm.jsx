import { useRef } from 'react';
import { CheckmarkSmallIcon, SolidWarningCircleIcon, UndoIcon } from './NhanVienIcons';
import SuaNhanVienInfoSection from './SuaNhanVienInfoSection';
import SuaNhanVienRoleSection from './SuaNhanVienRoleSection';
import useSuaNhanVienForm from '../hooks/useSuaNhanVienForm';
import styles from './SuaNhanVienForm.module.css';

export default function SuaNhanVienForm({ employee, onSuccess, onCancel }) {
  const dateInputRef = useRef(null);

  const {
    formData,
    errors,
    touched,
    isSubmitting,
    generalError,
    setField,
    handleBlur,
    submitForm,
  } = useSuaNhanVienForm({ employee, onSuccess, onCancel });

  const handleDateTrigger = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <form className={styles.formCard} onSubmit={submitForm} noValidate>
      {generalError && (
        <div className={styles.generalAlert} role="alert">
          <SolidWarningCircleIcon size={16} />
          <span>{generalError}</span>
        </div>
      )}

      {/* Card 1: Thông tin nhân viên */}
      <SuaNhanVienInfoSection
        formData={formData}
        errors={errors}
        touched={touched}
        setField={setField}
        handleBlur={handleBlur}
        dateInputRef={dateInputRef}
        handleDateTrigger={handleDateTrigger}
        styles={styles}
      />

      <hr className={styles.separator} />

      {/* Card 2: Chức vụ và phân quyền */}
      <SuaNhanVienRoleSection
        formData={formData}
        errors={errors}
        touched={touched}
        setField={setField}
        handleBlur={handleBlur}
        styles={styles}
      />

      <hr className={styles.separator} />

      {/* Footer buttons */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <UndoIcon size={16} />
          <span>Hủy</span>
        </button>

        <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
          <CheckmarkSmallIcon size={16} />
          <span>{isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
        </button>
      </div>
    </form>
  );
}
