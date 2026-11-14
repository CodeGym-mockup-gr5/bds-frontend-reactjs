import { useId } from 'react';
import { LockIcon, WarningCircleIcon } from './ProfileIcons';
import styles from './ProfileExtraFields.module.css';

export function LockedCodeField({ label, value, hint = '' }) {
  const inputId = useId();
  return (
    <div className={styles.fieldBlock}>
      <label htmlFor={inputId} className={styles.fieldGroup}>
        <span className={styles.label}>{label}</span>
        <span className={styles.inputWrapper}>
          <input
            id={inputId}
            type="text"
            value={value}
            disabled
            readOnly
            className={`${styles.input} ${styles.inputDisabled}`}
          />
          <span className={styles.inputRightIcon} aria-hidden="true">
            <LockIcon className={styles.lockIcon} />
          </span>
        </span>
      </label>
      {hint && <span className={styles.helperText}>{hint}</span>}
    </div>
  );
}

export function GenderRadioField({ value, error = '', disabled = false, onChange }) {
  const namId = useId();
  const nuId = useId();
  const labelId = useId();
  const errorId = useId();
  const hasError = Boolean(error);

  return (
    <div className={styles.fieldBlock}>
      <span id={labelId} className={styles.label}>
        Giới tính{' '}
        <span className={styles.requiredMark} aria-hidden="true">
          *
        </span>
      </span>
      <div
        className={styles.radioGroup}
        role="radiogroup"
        aria-labelledby={labelId}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
      >
        <label htmlFor={namId} className={styles.radioLabel}>
          <input
            id={namId}
            name="gioiTinh"
            type="radio"
            value="NAM"
            checked={value === 'NAM'}
            onChange={(e) => onChange('gioiTinh', e.target.value)}
            disabled={disabled}
            className={styles.radioInput}
          />
          <span>Nam</span>
        </label>
        <label htmlFor={nuId} className={styles.radioLabel}>
          <input
            id={nuId}
            name="gioiTinh"
            type="radio"
            value="NU"
            checked={value === 'NU'}
            onChange={(e) => onChange('gioiTinh', e.target.value)}
            disabled={disabled}
            className={styles.radioInput}
          />
          <span>Nữ</span>
        </label>
      </div>
      {hasError && (
        <span id={errorId} className={styles.errorText}>
          <WarningCircleIcon className={styles.captionIcon} />
          {error}
        </span>
      )}
    </div>
  );
}
