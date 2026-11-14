import { getPageItems } from '../utils/nhuCauFilter';
import { ChevronLeftIcon, ChevronRightIcon } from './NhuCauIcons';
import styles from './NhuCauPagination.module.css';

export default function NhuCauPagination({ page, totalPages, disabled = false, onChange }) {
  if (totalPages <= 1) return null;

  const isFirst = page <= 0;
  const isLast = page >= totalPages - 1;

  return (
    <nav className={styles.pagination} aria-label="Phân trang">
      <button
        type="button"
        className={`${styles.pageButton} ${styles.stepButton}`}
        onClick={() => onChange(page - 1)}
        disabled={disabled || isFirst}
        aria-label="Trang trước"
      >
        <ChevronLeftIcon className={styles.icon} />
        <span className={styles.stepLabel}>Trước</span>
      </button>

      <ul className={styles.pageList}>
        {getPageItems(page, totalPages).map((item) => {
          if (typeof item === 'string') {
            return (
              <li key={item} className={styles.gap} aria-hidden="true">
                …
              </li>
            );
          }
          const isCurrent = item === page;
          return (
            <li key={item}>
              <button
                type="button"
                className={`${styles.pageButton} ${isCurrent ? styles.pageButtonCurrent : ''}`}
                onClick={() => onChange(item)}
                disabled={disabled && !isCurrent}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`Trang ${item + 1}`}
              >
                {item + 1}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className={`${styles.pageButton} ${styles.stepButton}`}
        onClick={() => onChange(page + 1)}
        disabled={disabled || isLast}
        aria-label="Trang sau"
      >
        <span className={styles.stepLabel}>Sau</span>
        <ChevronRightIcon className={styles.icon} />
      </button>
    </nav>
  );
}
