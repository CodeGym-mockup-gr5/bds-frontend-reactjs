import { useId } from 'react';
import { LOAI_BDS_FILTER_OPTIONS, VI_TRI_FILTER_OPTIONS } from '../constants/nhuCauOptions';
import { SearchIcon, WarningIcon } from './NhuCauIcons';
import styles from './NhuCauFilterCard.module.css';

function FilterSelect({ id, label, name, value, options, onChange }) {
  return (
    <label htmlFor={id} className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select
        id={id}
        name={name}
        value={value}
        className={styles.control}
        onChange={(event) => onChange(name, event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value || 'all'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function NhuCauFilterCard({ filter, dienTichError = '', onChange, onSubmit }) {
  const baseId = useId();
  const dienTichId = `${baseId}-dien-tich`;
  const errorId = `${dienTichId}-error`;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      className={styles.card}
      role="search"
      aria-label="Lọc nhu cầu"
      onSubmit={handleSubmit}
      noValidate
    >
      <FilterSelect
        id={`${baseId}-loai-bds`}
        label="Loại bất động sản"
        name="loaiBds"
        value={filter.loaiBds}
        options={LOAI_BDS_FILTER_OPTIONS}
        onChange={onChange}
      />
      <FilterSelect
        id={`${baseId}-vi-tri`}
        label="Vị trí"
        name="viTri"
        value={filter.viTri}
        options={VI_TRI_FILTER_OPTIONS}
        onChange={onChange}
      />
      <div className={styles.field}>
        <label htmlFor={dienTichId} className={styles.field}>
          <span className={styles.label}>Diện tích</span>
          <span className={styles.inputWrapper}>
            <input
              id={dienTichId}
              name="dienTich"
              type="text"
              inputMode="decimal"
              placeholder="VD: 80"
              value={filter.dienTich}
              className={`${styles.control} ${styles.inputWithSuffix} ${
                dienTichError ? styles.controlError : ''
              }`}
              aria-invalid={Boolean(dienTichError)}
              aria-describedby={dienTichError ? errorId : undefined}
              onChange={(event) => onChange('dienTich', event.target.value)}
            />
            <span className={styles.suffix} aria-hidden="true">
              m²
            </span>
          </span>
        </label>
        {dienTichError && (
          <span id={errorId} className={styles.errorText} role="alert">
            <WarningIcon className={styles.errorIcon} />
            {dienTichError}
          </span>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        <SearchIcon className={styles.buttonIcon} />
        Tìm kiếm
      </button>
    </form>
  );
}
