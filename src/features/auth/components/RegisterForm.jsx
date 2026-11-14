import { useId } from 'react';
import logoColor from '../../../assets/images/logo-color.png';
import useRegisterForm from '../hooks/useRegisterForm';
import { PasswordToggleIcon, WarningCircleIcon } from './LoginIcons';
import RegisterSkeleton from './RegisterSkeleton';
import styles from './RegisterForm.module.css';

function RegisterField({
  name,
  label,
  required = false,
  optionalText = '',
  type = 'text',
  placeholder = '',
  autoComplete = 'off',
  value,
  error = '',
  disabled = false,
  isPassword = false,
  isPasswordVisible = false,
  onTogglePassword = null,
  onChange,
  onBlur,
}) {
  const fieldId = useId();
  const isInvalid = Boolean(error);
  const resolvedPasswordType = isPasswordVisible ? 'text' : 'password';
  const inputType = isPassword ? resolvedPasswordType : type;

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={fieldId} className={styles.fieldGroup}>
        <span className={styles.label}>
          {label}
          {required && (
            <span className={styles.requiredMark} aria-hidden="true">
              *
            </span>
          )}
          {optionalText && <span className={styles.optionalHint}>{optionalText}</span>}
        </span>

        <span className={styles.inputWrapper}>
          <input
            id={fieldId}
            name={name}
            type={inputType}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={(e) => onBlur(name, e.target.value)}
            disabled={disabled}
            aria-invalid={isInvalid}
            className={`${styles.input} ${isPassword ? styles.inputPassword : ''} ${
              isPassword && isInvalid ? styles.inputWithTwoIcons : ''
            } ${isInvalid ? styles.inputError : ''}`}
          />

          {(isInvalid || isPassword) && (
            <span className={styles.inputRightControls}>
              {isInvalid && (
                <span className={styles.inputErrorIcon} aria-hidden="true">
                  <WarningCircleIcon className={styles.inputErrorIcon} />
                </span>
              )}
              {isPassword && (
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={onTogglePassword}
                  aria-label={isPasswordVisible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  <PasswordToggleIcon isVisible={isPasswordVisible} />
                </button>
              )}
            </span>
          )}
        </span>
      </label>

      {error && (
        <span className={styles.errorText} role="alert">
          <WarningCircleIcon className={styles.errorCaptionIcon} />
          {error}
        </span>
      )}
    </div>
  );
}

export default function RegisterForm({
  onCancel,
  onSwitchToLogin = null,
  onRegistered = null,
  isLoadingSkeleton = false,
}) {
  const checkboxId = useId();
  const {
    values,
    fieldErrors,
    generalError,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    isSubmitting,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
  } = useRegisterForm(onRegistered);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={logoColor} alt="REALIA" className={styles.logo} />
        <h2 className={styles.title}>Đăng ký tài khoản</h2>
        <p className={styles.subtitle}>
          Vui lòng điền thông tin bên dưới để tạo tài khoản khách hàng
        </p>
      </div>

      {isLoadingSkeleton ? (
        <RegisterSkeleton />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {generalError && (
            <div className={styles.generalError} role="alert">
              <WarningCircleIcon className={styles.generalErrorIcon} />
              <span>{generalError}</span>
            </div>
          )}

          <div className={styles.rowTwoCols}>
            <RegisterField
              name="tenDangNhap"
              label="Tên đăng nhập"
              required
              autoComplete="username"
              placeholder="VD: nguyenvana"
              value={values.tenDangNhap}
              error={fieldErrors.tenDangNhap}
              disabled={isSubmitting}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
            <RegisterField
              name="hoTen"
              label="Họ và tên"
              required
              autoComplete="name"
              placeholder="VD: Nguyễn Văn An"
              value={values.hoTen}
              error={fieldErrors.hoTen}
              disabled={isSubmitting}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
          </div>

          <div className={styles.rowTwoCols}>
            <RegisterField
              name="soDienThoai"
              label="Số điện thoại"
              required
              type="tel"
              autoComplete="tel"
              placeholder="VD: 0905123456"
              value={values.soDienThoai}
              error={fieldErrors.soDienThoai}
              disabled={isSubmitting}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
            <RegisterField
              name="email"
              label="Email"
              required
              type="email"
              autoComplete="email"
              placeholder="VD: nguyenvanan@gmail.com"
              value={values.email}
              error={fieldErrors.email}
              disabled={isSubmitting}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
          </div>

          <RegisterField
            name="soCccd"
            label="Số CCCD"
            optionalText="(Không bắt buộc)"
            placeholder="VD: 012345678901"
            value={values.soCccd}
            error={fieldErrors.soCccd}
            disabled={isSubmitting}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />

          <div className={styles.rowTwoCols}>
            <RegisterField
              name="matKhau"
              label="Mật khẩu"
              required
              autoComplete="new-password"
              placeholder="Tối thiểu 8 ký tự"
              value={values.matKhau}
              error={fieldErrors.matKhau}
              disabled={isSubmitting}
              isPassword
              isPasswordVisible={showPassword}
              onTogglePassword={toggleShowPassword}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
            <RegisterField
              name="xacNhanMatKhau"
              label="Xác nhận mật khẩu"
              required
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu"
              value={values.xacNhanMatKhau}
              error={fieldErrors.xacNhanMatKhau}
              disabled={isSubmitting}
              isPassword
              isPasswordVisible={showConfirmPassword}
              onTogglePassword={toggleShowConfirmPassword}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
            />
          </div>

          <div className={styles.sellerOptionBox}>
            <label htmlFor={checkboxId} className={styles.checkboxLabel}>
              <input
                id={checkboxId}
                type="checkbox"
                checked={values.muonDangTinBan}
                onChange={(e) => handleFieldChange('muonDangTinBan', e.target.checked)}
                disabled={isSubmitting}
                className={styles.checkboxInput}
              />
              <span>Bạn có đất, nhà... muốn đăng tin bán không?</span>
            </label>
            <p className={styles.sellerHint}>
              Nếu chọn, tài khoản vẫn dùng ngay để xem BĐS và sẽ gửi Admin duyệt quyền đăng tin bán.
            </p>
          </div>

          <div className={styles.bottomRow}>
            {onSwitchToLogin ? (
              <div className={styles.footerSwitch}>
                <span>Đã có tài khoản?</span>
                <button
                  type="button"
                  className={styles.switchButton}
                  onClick={onSwitchToLogin}
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </button>
              </div>
            ) : (
              <span />
            )}

            <div className={styles.actionsRow}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
                <span>{isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
