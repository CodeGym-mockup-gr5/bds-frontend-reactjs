import { ChevronLeftIcon, ChevronRightIcon } from './NhanVienIcons';
import styles from './NhanVienPagination.module.css';

export default function NhanVienPagination({
  page,
  pageSize,
  totalElements,
  totalPages,
  disabled,
  onChange,
}) {
  if (totalElements <= 0 || totalPages <= 0) {
    return null;
  }

  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, totalElements);

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <nav className={styles.pagination} aria-label="Phân trang danh sách nhân viên">
      <p className={styles.count} role="status">
        {`Hiển thị ${from}–${to} / ${totalElements} nhân viên`}
      </p>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.pageButton} ${styles.navButton}`}
          disabled={disabled || page <= 0}
          onClick={() => onChange(page - 1)}
          aria-label="Trang trước"
        >
          <ChevronLeftIcon size={16} />
        </button>

        {pages.map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              type="button"
              className={isActive ? `${styles.pageButton} ${styles.active}` : styles.pageButton}
              disabled={disabled || isActive}
              onClick={() => onChange(p)}
              aria-current={isActive ? 'page' : undefined}
            >
              {p + 1}
            </button>
          );
        })}

        <button
          type="button"
          className={`${styles.pageButton} ${styles.navButton}`}
          disabled={disabled || page >= totalPages - 1}
          onClick={() => onChange(page + 1)}
          aria-label="Trang sau"
        >
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </nav>
  );
}
