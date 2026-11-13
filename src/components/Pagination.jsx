import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import styles from './Pagination.module.css';

const MAX_VISIBLE_PAGES = 5;

function getVisiblePages(page, totalPages) {
  const count = Math.min(MAX_VISIBLE_PAGES, totalPages);
  const half = Math.floor(count / 2);
  const start = Math.min(Math.max(page - half, 1), totalPages - count + 1);
  return Array.from({ length: count }, (_, index) => start + index);
}

export default function Pagination({ page, totalPages, onChange, disabled = false }) {
  if (totalPages < 1) {
    return null;
  }

  const pages = getVisiblePages(Math.min(page, totalPages), totalPages);

  return (
    <nav className={styles.pagination} aria-label="Phân trang">
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(page - 1)}
        disabled={disabled || page <= 1}
        aria-label="Trang trước"
      >
        <ChevronLeftIcon />
      </button>
      {pages.map((item) => (
        <button
          key={item}
          type="button"
          className={`${styles.button} ${item === page ? styles.active : ''}`}
          onClick={() => onChange(item)}
          disabled={disabled}
          aria-label={`Trang ${item}`}
          aria-current={item === page ? 'page' : undefined}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(page + 1)}
        disabled={disabled || page >= totalPages}
        aria-label="Trang sau"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
