import { useId } from 'react';
import { CheckIcon } from './DangTinIcons';
import { FieldError } from './FormField';
import formStyles from './DangTinForm.module.css';
import styles from './PillRadioGroup.module.css';

export default function PillRadioGroup({
  name,
  label,
  value,
  options,
  onChange,
  onBlur,
  error = '',
  required = false,
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <fieldset className={formStyles.fieldset} aria-describedby={error ? errorId : undefined}>
      <legend className={`${formStyles.label} ${formStyles.legend}`}>
        {label}
        {required && (
          <span className={formStyles.required} aria-hidden="true">
            {' *'}
          </span>
        )}
      </legend>
      <div className={styles.pillRow}>
        {options.map((option, index) => {
          const optionId = `${id}-${option.value}`;
          const isChecked = value === option.value;
          const pillClassName = [
            styles.pill,
            isChecked ? styles.pillChecked : '',
            error ? styles.pillError : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <label key={option.value} htmlFor={optionId} className={pillClassName}>
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                data-invalid={error && index === 0 ? 'true' : undefined}
                className={styles.visuallyHidden}
                onChange={() => onChange(name, option.value)}
                onBlur={() => onBlur(name)}
              />
              {isChecked && <CheckIcon className={styles.pillIcon} />}
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && <FieldError id={errorId} message={error} />}
    </fieldset>
  );
}
