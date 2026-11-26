import { useId } from 'react';
import Icon from '../../../components/Icon';
import styles from './FormField.module.css';

export default function FormField({
  label,
  name,
  form,
  type = 'text',
  multiline = false,
  disabled = false,
  placeholder = undefined,
  maxLength = undefined,
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const error = form.errors[name];
  const baseClass = multiline ? styles.textarea : styles.input;
  const className = error ? `${baseClass} ${styles.invalid}` : baseClass;
  const handleChange = (event) => form.changeField(name, event.target.value);
  const handleBlur = () => form.blurField(name);

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
          <span className={styles.required} aria-hidden="true">
            {' *'}
          </span>
        </label>
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            <Icon name="warning" size={16} />
            {error}
          </p>
        )}
      </div>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          className={className}
          value={form.values[name]}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          aria-required="true"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className={className}
          value={form.values[name]}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          aria-required="true"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      )}
    </div>
  );
}
