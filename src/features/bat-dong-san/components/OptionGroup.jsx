import { useId } from 'react';
import styles from './OptionGroup.module.css';

export default function OptionGroup({ label, options, value, onChange, allLabel = 'Tất cả' }) {
  const labelId = useId();
  const items = [{ value: '', label: allLabel }, ...options];

  return (
    <div className={styles.group}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <div className={styles.options} role="radiogroup" aria-labelledby={labelId}>
        {items.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value || 'all'}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.option} ${isSelected ? styles.selected : ''}`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
