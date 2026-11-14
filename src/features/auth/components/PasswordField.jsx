import { useId } from 'react';
import { PasswordToggleIcon, WarningCircleIcon } from './LoginIcons';
import styles from './PasswordField.module.css';

export default function PasswordField({
  label,
  name,
  value,
  placeholder = '',
  autoComplete = 'off',
  required = true,
  disabled = false,
  error = '',
  isVisible = false,
  onToggleVisibility,
  onChange,
  onBlur,
}) {
  const inputId = useId();
  const errorId = useId();
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
            type={isVisible ? 'text' : 'password'}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={(e) => onBlur(name, e.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
          />

          <button
            type="button"
            className={`${styles.eyeButton} ${hasError ? styles.eyeButtonError : ''}`}
            onClick={() => onToggleVisibility(name)}
            disabled={disabled}
            aria-label={isVisible ? `Ẩn ${label.toLowerCase()}` : `Hiện ${label.toLowerCase()}`}
          >
            <PasswordToggleIcon isVisible={isVisible} />
          </button>
        </span>
      </label>

      {hasError && (
        <span id={errorId} className={styles.errorText}>
          <WarningCircleIcon className={styles.captionIcon} />
          {error}
        </span>
      )}
    </div>
  );
}
