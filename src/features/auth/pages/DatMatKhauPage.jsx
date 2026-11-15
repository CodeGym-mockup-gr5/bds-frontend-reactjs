import { Link } from 'react-router-dom';
import logoColor from '../../../assets/images/logo-color.png';
import { WarningCircleIcon } from '../components/LoginIcons';
import PasswordField from '../components/PasswordField';
import useSetPasswordForm from '../hooks/useSetPasswordForm';
import styles from './DatMatKhauPage.module.css';

export default function DatMatKhauPage() {
  const {
    hasToken,
    values,
    errors,
    serverError,
    visibility,
    isSubmitting,
    handleToggleVisibility,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useSetPasswordForm();

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <img src={logoColor} alt="REALIA" className={styles.logo} />
            <h1 className={styles.title}>Thiết lập mật khẩu</h1>
            <p className={styles.subtitle}>
              Tạo mật khẩu mới từ 8 đến 64 ký tự để kích hoạt hoặc khôi phục tài khoản của bạn.
            </p>
          </div>

          {!hasToken ? (
            <div className={styles.invalidState}>
              <div className={styles.errorBanner} role="alert">
                <WarningCircleIcon className={styles.bannerIcon} />
                <span>Liên kết không hợp lệ hoặc thiếu mã xác thực.</span>
              </div>
              <div className={styles.invalidActions}>
                <Link to="/quen-mat-khau" className={styles.submitButton}>
                  Yêu cầu liên kết mới
                </Link>
                <Link to="/dang-nhap" className={styles.secondaryButton}>
                  Về trang đăng nhập
                </Link>
              </div>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {serverError && (
                <div className={styles.errorBanner} role="alert">
                  <WarningCircleIcon className={styles.bannerIcon} />
                  <div className={styles.bannerContent}>
                    <span>{serverError}</span>
                    <Link to="/quen-mat-khau" className={styles.bannerLink}>
                      Yêu cầu liên kết mới
                    </Link>
                  </div>
                </div>
              )}

              <PasswordField
                label="Mật khẩu mới"
                name="matKhau"
                value={values.matKhau}
                placeholder="Từ 8 đến 64 ký tự"
                autoComplete="new-password"
                disabled={isSubmitting}
                error={errors.matKhau}
                isVisible={visibility.matKhau}
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

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
                <span>{isSubmitting ? 'Đang lưu mật khẩu...' : 'Xác nhận'}</span>
              </button>

              <div className={styles.footerLinkRow}>
                <Link to="/dang-nhap" className={styles.inlineLink}>
                  Quay lại đăng nhập
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
