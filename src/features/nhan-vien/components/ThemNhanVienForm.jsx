import { CheckmarkSmallIcon, SolidWarningCircleIcon, UndoIcon } from './NhanVienIcons';
import ThemNhanVienInfoSection from './ThemNhanVienInfoSection';
import ThemNhanVienRoleSection from './ThemNhanVienRoleSection';
import styles from './ThemNhanVienForm.module.css';

export default function ThemNhanVienForm({
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
}) {
  return (
    <form className={styles.formCard} onSubmit={submitForm} noValidate>
      {generalError && (
        <div className={styles.generalAlert} role="alert">
          <SolidWarningCircleIcon size={16} />
          <span>{generalError}</span>
        </div>
      )}

      {/* Card 1: Thông tin nhân viên */}
      <ThemNhanVienInfoSection
        formData={formData}
        errors={errors}
        touched={touched}
        setField={setField}
        handleBlur={handleBlur}
        styles={styles}
      />

      <hr className={styles.separator} />

      {/* Card 2: Chức vụ và phân quyền */}
      <ThemNhanVienRoleSection
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
          onClick={cancel}
          disabled={isSubmitting}
        >
          <UndoIcon size={16} />
          <span>Hủy</span>
        </button>

        <div className={styles.footerRight}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={resetForm}
            disabled={isSubmitting}
          >
            <span>Đặt lại</span>
          </button>

          <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
            <CheckmarkSmallIcon size={16} />
            <span>{isSubmitting ? 'Đang lưu...' : 'Lưu lại'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
