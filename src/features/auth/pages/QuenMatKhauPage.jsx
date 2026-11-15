import { useId } from 'react';
import { Link } from 'react-router-dom';
import logoColor from '../../../assets/images/logo-color.png';
import { MailIcon, WarningCircleIcon } from '../components/LoginIcons';
import useForgotPasswordForm from '../hooks/useForgotPasswordForm';
import styles from './QuenMatKhauPage.module.css';

export default function QuenMatKhauPage() {
  const usernameId = useId();
  const errorId = useId();
  const {
    tenDangNhap,
    fieldError,
    serverError,
    successMessage,
    isSubmitting,
    handleChange,
    handleBlur,
    handleTryAnother,
    handleSubmit,
  } = useForgotPasswordForm();

  const hasFieldError = Boolean(fieldError);

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <img src={logoColor} alt="REALIA" className={styles.logo} />
            <h1 className={styles.title}>
              {successMessage ? 'Kiểm tra email của bạn' : 'Quên mật khẩu'}
            </h1>
            <p className={styles.subtitle}>
              {successMessage
                ? 'Yêu cầu đặt lại mật khẩu đã được tiếp nhận.'
                : 'Nhập tên đăng nhập để nhận liên kết đặt lại mật khẩu qua email đã đăng ký.'}
            </p>
          </div>

          {successMessage ? (
            <div className={styles.successBox}>
              <div className={styles.successBadge}>
                <MailIcon className={styles.successIcon} />
              </div>
              <p className={styles.successMessage} role="status">
                {successMessage}
              </p>
              <p className={styles.successNote}>
                Vui lòng kiểm tra hộp thư đến hoặc thư mục spam. Liên kết đặt lại mật khẩu chỉ có
                hiệu lực trong thời gian giới hạn.
              </p>
              <div className={styles.successActions}>
                <Link to="/dang-nhap" className={styles.submitButton}>
                  Quay lại đăng nhập
                </Link>
                <button type="button" className={styles.secondaryButton} onClick={handleTryAnother}>
                  Thử tên đăng nhập khác
                </button>
              </div>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {serverError && (
                <div className={styles.errorBanner} role="alert">
                  <WarningCircleIcon className={styles.bannerIcon} />
                  <span>{serverError}</span>
                </div>
              )}

              <div className={styles.fieldBlock}>
                <label htmlFor={usernameId} className={styles.fieldGroup}>
                  <span className={styles.label}>
                    Tên đăng nhập
                    <span className={styles.requiredMark} aria-hidden="true">
                      {' *'}
                    </span>
                  </span>
                  <span className={styles.inputWrapper}>
                    <input
                      id={usernameId}
                      name="tenDangNhap"
                      type="text"
                      autoComplete="username"
                      placeholder="VD: nguyenvana"
                      value={tenDangNhap}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={(e) => handleBlur(e.target.value)}
                      disabled={isSubmitting}
                      aria-invalid={hasFieldError}
                      aria-describedby={hasFieldError ? errorId : undefined}
                      className={`${styles.input} ${hasFieldError ? styles.inputError : ''}`}
                    />
                    {hasFieldError && (
                      <span className={styles.inputRightIcon} aria-hidden="true">
                        <WarningCircleIcon className={styles.errorInputIcon} />
                      </span>
                    )}
                  </span>
                </label>

                {hasFieldError && (
                  <span id={errorId} className={styles.errorText}>
                    <WarningCircleIcon className={styles.captionIcon} />
                    {fieldError}
                  </span>
                )}
              </div>

              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
                <span>
                  {isSubmitting ? 'Đang gửi yêu cầu...' : 'Gửi hướng dẫn đặt lại mật khẩu'}
                </span>
              </button>

              <div className={styles.footerLinkRow}>
                <span>Đã nhớ mật khẩu?</span>
                <Link to="/dang-nhap" className={styles.inlineLink}>
                  Đăng nhập
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
