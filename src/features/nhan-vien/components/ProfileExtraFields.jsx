import { useId } from 'react';
import PropTypes from 'prop-types';
import { LockIcon, WarningCircleIcon } from './ProfileIcons';
import styles from '../pages/SuaThongTinCaNhanPage.module.css';

export function LockedCodeField({ label, value, hint }) {
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

LockedCodeField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  hint: PropTypes.string,
};

LockedCodeField.defaultProps = {
  hint: '',
};

export function GenderRadioField({ value, error = '', disabled = false, onChange }) {
  const namId = useId();
  const nuId = useId();

  return (
    <div className={styles.fieldBlock}>
      <span className={styles.label}>
        Giới tính <span className={styles.requiredMark}>*</span>
      </span>
      <div className={styles.radioGroup} role="radiogroup" aria-label="Giới tính">
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
      {error && (
        <span className={styles.errorText} role="alert">
          <WarningCircleIcon className={styles.captionIcon} />
          {error}
        </span>
      )}
    </div>
  );
}

GenderRadioField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

GenderRadioField.defaultProps = {
  error: '',
  disabled: false,
};

export function LockedSelectField({ label, value, options, hint }) {
  const selectId = useId();
  return (
    <div className={styles.fieldBlock}>
      <label htmlFor={selectId} className={styles.fieldGroup}>
        <span className={styles.label}>{label}</span>
        <select
          id={selectId}
          value={value}
          disabled
          className={`${styles.select} ${styles.inputDisabled}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {hint && <span className={styles.helperText}>{hint}</span>}
    </div>
  );
}

LockedSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  hint: PropTypes.string,
};

LockedSelectField.defaultProps = {
  hint: '',
};
