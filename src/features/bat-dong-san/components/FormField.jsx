import { WarningIcon } from './DangTinIcons';
import styles from './DangTinForm.module.css';

export function getDescribedBy(id, error, hint) {
  if (error) return `${id}-error`;
  return hint ? `${id}-hint` : undefined;
}

export function FieldError({ id, message }) {
  return (
    <span id={id} className={styles.errorText} role="alert">
      <WarningIcon className={styles.errorIcon} />
      {message}
    </span>
  );
}

export default function FormField({
  id,
  label,
  required = false,
  hint = '',
  error = '',
  counter = '',
  children,
}) {
  const hasMeta = Boolean(error || hint || counter);

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.labelBlock}>
        <span className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {' *'}
            </span>
          )}
        </span>
        {children}
      </label>
      {hasMeta && (
        <div className={styles.metaRow}>
          {error && <FieldError id={`${id}-error`} message={error} />}
          {!error && hint && (
            <span id={`${id}-hint`} className={styles.hint}>
              {hint}
            </span>
          )}
          {counter && <span className={styles.counter}>{counter}</span>}
        </div>
      )}
    </div>
  );
}
