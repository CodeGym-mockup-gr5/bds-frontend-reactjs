import useChangePasswordForm from '../hooks/useChangePasswordForm';
import { WarningCircleIcon } from './LoginIcons';
import PasswordField from './PasswordField';
import styles from './ChangePasswordForm.module.css';

export default function ChangePasswordForm({ onExit }) {
  const {
    values,
    errors,
    serverError,
    visibility,
    isSubmitting,
    handleToggleVisibility,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
  } = useChangePasswordForm();

  return (
    <>
      {serverError && (
        <div className={styles.errorBanner} role="alert">
          <WarningCircleIcon className={styles.bannerIcon} />
          <span>{serverError}</span>
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <PasswordField
          label="Mật khẩu cũ"
          name="matKhauCu"
          value={values.matKhauCu}
          placeholder="Nhập mật khẩu hiện tại"
          autoComplete="current-password"
          disabled={isSubmitting}
          error={errors.matKhauCu}
          isVisible={visibility.matKhauCu}
          onToggleVisibility={handleToggleVisibility}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <PasswordField
          label="Mật khẩu mới"
          name="matKhauMoi"
          value={values.matKhauMoi}
          placeholder="Nhập mật khẩu mới"
          autoComplete="new-password"
          disabled={isSubmitting}
          error={errors.matKhauMoi}
          isVisible={visibility.matKhauMoi}
          onToggleVisibility={handleToggleVisibility}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <PasswordField
          label="Xác nhận mật khẩu"
          name="xacNhanMatKhau"
          value={values.xacNhanMatKhau}
          placeholder="Nhập lại mật khẩu mới"
          autoComplete="new-password"
          disabled={isSubmitting}
          error={errors.xacNhanMatKhau}
          isVisible={visibility.xacNhanMatKhau}
          onToggleVisibility={handleToggleVisibility}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className={styles.formFooter}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Nhập lại
          </button>

          <button
            type="button"
            className={styles.exitButton}
            onClick={onExit}
            disabled={isSubmitting}
          >
            Thoát
          </button>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
            <span>{isSubmitting ? 'Đang lưu...' : 'Xác nhận'}</span>
          </button>
        </div>
      </form>
    </>
  );
}
