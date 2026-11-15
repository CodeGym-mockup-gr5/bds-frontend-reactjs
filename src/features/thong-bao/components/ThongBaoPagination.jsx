import Icon from '../../../components/Icon';
import { getPageItems, getRangeText } from '../utils/thongBaoPagination';
import styles from './ThongBaoPagination.module.css';

export default function ThongBaoPagination({
  page,
  size,
  itemCount,
  totalElements,
  totalPages,
  rangePage = undefined,
  disabled = false,
  onChange,
}) {
  const isFirst = page <= 0;
  const isLast = page >= totalPages - 1;

  return (
    <div className={styles.footer}>
      <p className={styles.summary} role="status">
        {getRangeText(rangePage ?? page, size, itemCount, totalElements)}
      </p>

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Phân trang">
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => onChange(page - 1)}
            disabled={disabled || isFirst}
            aria-label="Trang trước"
          >
            <Icon name="chevronLeft" />
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
            className={styles.pageButton}
            onClick={() => onChange(page + 1)}
            disabled={disabled || isLast}
            aria-label="Trang sau"
          >
            <Icon name="chevronRight" />
          </button>
        </nav>
      )}
    </div>
  );
}
