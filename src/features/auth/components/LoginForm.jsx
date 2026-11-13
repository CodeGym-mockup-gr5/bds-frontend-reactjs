import { useId } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logoColor from '../../../assets/images/logo-color.png';
import useLoginForm from '../hooks/useLoginForm';
import { PasswordToggleIcon, WarningCircleIcon } from './LoginIcons';
import LoginSkeleton from './LoginSkeleton';
import styles from './LoginForm.module.css';

export default function LoginForm({
  onSuccess = null,
  onNavigateAway = null,
  isLoadingSkeleton = false,
  withShadow = false,
}) {
  const usernameId = useId();
  const passwordId = useId();
  const rememberId = useId();
  const {
    tenDangNhap,
    matKhau,
    rememberMe,
    setRememberMe,
    showPassword,
    toggleShowPassword,
    fieldErrors,
    generalError,
    hasAuthError,
    isSubmitting,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  } = useLoginForm(onSuccess);

  const isUsernameInvalid = Boolean(fieldErrors.tenDangNhap) || hasAuthError;
  const isPasswordInvalid = Boolean(fieldErrors.matKhau) || hasAuthError;

  return (
    <div className={`${styles.card} ${withShadow ? styles.cardShadow : ''}`}>
      <div className={styles.header}>
        <img src={logoColor} alt="REALIA" className={styles.logo} />
        <h2 className={styles.title}>Đăng nhập</h2>
        <p className={styles.subtitle}>Nhập tài khoản và mật khẩu để truy cập hệ thống</p>
      </div>

      {isLoadingSkeleton ? (
        <LoginSkeleton />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {generalError && (
            <div className={styles.generalError} role="alert">
              <WarningCircleIcon className={styles.generalErrorIcon} />
              <span>{generalError}</span>
            </div>
          )}

          <div className={styles.fieldGroup}>
            <label htmlFor={usernameId} className={styles.fieldGroup}>
              <span className={styles.label}>
                Tên đăng nhập
                <span className={styles.requiredMark} aria-hidden="true">
                  *
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
                  onChange={(e) => handleFieldChange('tenDangNhap', e.target.value)}
                  onBlur={(e) => handleFieldBlur('tenDangNhap', e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={isUsernameInvalid}
                  className={`${styles.input} ${isUsernameInvalid ? styles.inputError : ''}`}
                />
                {isUsernameInvalid && (
                  <span className={styles.inputRightControls}>
                    <span className={styles.inputErrorIcon} aria-hidden="true">
                      <WarningCircleIcon className={styles.inputErrorIcon} />
                    </span>
                  </span>
                )}
              </span>
            </label>
            {fieldErrors.tenDangNhap && (
              <span className={styles.errorText} role="alert">
                <WarningCircleIcon className={styles.errorCaptionIcon} />
                {fieldErrors.tenDangNhap}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor={passwordId} className={styles.fieldGroup}>
              <span className={styles.label}>
                Mật khẩu
                <span className={styles.requiredMark} aria-hidden="true">
                  *
                </span>
              </span>
              <span className={styles.inputWrapper}>
                <input
                  id={passwordId}
                  name="matKhau"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={matKhau}
                  onChange={(e) => handleFieldChange('matKhau', e.target.value)}
                  onBlur={(e) => handleFieldBlur('matKhau', e.target.value)}
                  disabled={isSubmitting}
                  aria-invalid={isPasswordInvalid}
                  className={`${styles.input} ${styles.inputWithTwoIcons} ${
                    isPasswordInvalid ? styles.inputError : ''
                  }`}
                />
                <span className={styles.inputRightControls}>
                  {isPasswordInvalid && (
                    <span className={styles.inputErrorIcon} aria-hidden="true">
                      <WarningCircleIcon className={styles.inputErrorIcon} />
                    </span>
                  )}
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    <PasswordToggleIcon isVisible={showPassword} />
                  </button>
                </span>
              </span>
            </label>
            {fieldErrors.matKhau && (
              <span className={styles.errorText} role="alert">
                <WarningCircleIcon className={styles.errorCaptionIcon} />
                {fieldErrors.matKhau}
              </span>
            )}
          </div>

          <div className={styles.optionsRow}>
            <label htmlFor={rememberId} className={styles.checkboxLabel}>
              <input
                id={rememberId}
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
                className={styles.checkboxInput}
              />
              <span>Nhớ mật khẩu</span>
            </label>

            <Link to="/quen-mat-khau" className={styles.forgotLink} onClick={onNavigateAway}>
              Quên mật khẩu?
            </Link>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
            <span>{isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}</span>
          </button>
        </form>
      )}
    </div>
  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func,
  onNavigateAway: PropTypes.func,
  isLoadingSkeleton: PropTypes.bool,
  withShadow: PropTypes.bool,
};

LoginForm.defaultProps = {
  onSuccess: null,
  onNavigateAway: null,
  isLoadingSkeleton: false,
  withShadow: false,
};
