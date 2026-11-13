import { useId } from 'react';
import { AlertIcon } from '../../../components/Icons';
import styles from './RangeField.module.css';

function RangeInput({ id, prefix, value, unit, hasError, describedBy, onChange, onBlur }) {
  return (
    <div className={`${styles.inputWrap} ${hasError ? styles.inputError : ''}`}>
      <label htmlFor={id} className={styles.prefix}>
        {prefix}
      </label>
      <input
        id={id}
        className={styles.input}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={hasError}
        aria-describedby={describedBy}
      />
      <span className={styles.unit}>{unit}</span>
    </div>
  );
}

export default function RangeField({ label, unit, hint, from, to, error, onBlur }) {
  const baseId = useId();
  const messageId = `${baseId}-message`;
  const hasError = Boolean(error);

  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>{label}</legend>
      <div className={styles.inputs}>
        <RangeInput
          id={`${baseId}-from`}
          prefix="Từ"
          value={from.value}
          unit={unit}
          hasError={hasError}
          describedBy={messageId}
          onChange={from.onChange}
          onBlur={onBlur}
        />
        <RangeInput
          id={`${baseId}-to`}
          prefix="Đến"
          value={to.value}
          unit={unit}
          hasError={hasError}
          describedBy={messageId}
          onChange={to.onChange}
          onBlur={onBlur}
        />
      </div>
      {hasError ? (
        <p id={messageId} className={styles.error} role="alert">
          <AlertIcon size={14} />
          {error}
        </p>
      ) : (
        <p id={messageId} className={styles.hint}>
          {hint}
        </p>
      )}
    </fieldset>
  );
}
