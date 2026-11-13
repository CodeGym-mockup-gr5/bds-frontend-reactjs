import { useId } from 'react';
import { WarningCircleIcon } from './ProfileIcons';
import styles from '../pages/SuaThongTinCaNhanPage.module.css';

export default function ProfileTextField({
  label,
  name,
  type = 'text',
  value,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  showErrorIcon = true,
  onChange,
  onBlur = null,
}) {
  const inputId = useId();
  const hasError = Boolean(error);

  return (
    <div className={styles.fieldBlock}>
      <label htmlFor={inputId} className={styles.fieldGroup}>
        <span className={styles.label}>
          {label}
          {required && (
            <span className={styles.requiredMark} aria-hidden="true">
              {' *'}
            </span>
          )}
        </span>
        <span className={styles.inputWrapper}>
          <input
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={onBlur ? (e) => onBlur(name, e.target.value) : undefined}
            disabled={disabled}
            aria-invalid={hasError}
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
          />
          {hasError && showErrorIcon && (
            <span className={styles.inputRightIcon} aria-hidden="true">
              <WarningCircleIcon className={styles.errorInputIcon} />
            </span>
          )}
        </span>
      </label>
      {hasError && (
        <span className={styles.errorText} role="alert">
          <WarningCircleIcon className={styles.captionIcon} />
          {error}
        </span>
      )}
    </div>
  );
}
