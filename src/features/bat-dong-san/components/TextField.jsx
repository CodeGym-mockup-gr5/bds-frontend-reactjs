import { useId } from 'react';
import FormField, { getDescribedBy } from './FormField';
import styles from './DangTinForm.module.css';

export default function TextField({
  name,
  label,
  value,
  onChange = null,
  onBlur = null,
  error = '',
  required = false,
  hint = '',
  placeholder = '',
  maxLength = undefined,
  inputMode = undefined,
  suffix = '',
  readOnly = false,
  multiline = false,
  showCounter = false,
  inputRef = null,
}) {
  const id = useId();
  const Control = multiline ? 'textarea' : 'input';
  const counter = showCounter && maxLength ? `${value.length}/${maxLength}` : '';
  const className = [
    styles.input,
    multiline ? styles.textarea : '',
    error ? styles.inputError : '',
    readOnly ? styles.inputReadOnly : '',
    suffix ? styles.inputWithSuffix : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      counter={counter}
    >
      <span className={styles.inputWrapper}>
        <Control
          ref={inputRef}
          id={id}
          name={name}
          type={multiline ? undefined : 'text'}
          rows={multiline ? 2 : undefined}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
          readOnly={readOnly}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={getDescribedBy(id, error, hint)}
          className={className}
          onChange={onChange ? (event) => onChange(name, event.target.value) : undefined}
          onBlur={onBlur ? () => onBlur(name) : undefined}
        />
        {suffix && (
          <span className={styles.suffix} aria-hidden="true">
            {suffix}
          </span>
        )}
      </span>
    </FormField>
  );
}
