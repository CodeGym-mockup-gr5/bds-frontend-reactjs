import { useId } from 'react';
import FormField, { getDescribedBy } from './FormField';
import styles from './DangTinForm.module.css';

export default function SelectField({
  name,
  label,
  value,
  options,
  placeholder,
  onChange,
  onBlur,
  error = '',
  required = false,
}) {
  const id = useId();

  return (
    <FormField id={id} label={label} required={required} error={error}>
      <select
        id={id}
        name={name}
        value={value}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={getDescribedBy(id, error, '')}
        className={[
          styles.input,
          styles.select,
          value ? '' : styles.selectPlaceholder,
          error ? styles.inputError : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onChange={(event) => onChange(name, event.target.value)}
        onBlur={() => onBlur(name)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
