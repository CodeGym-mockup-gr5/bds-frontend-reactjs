import { ChevronLeftIcon, ChevronRightIcon } from './NhanVienIcons';
import styles from './NhanVienPagination.module.css';

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  if (currentPage <= 3) {
    return [0, 1, 2, 3, 4, 'ellipsis-end', totalPages - 1];
  }

  if (currentPage >= totalPages - 4) {
    return [
      0,
      'ellipsis-start',
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
    ];
  }

  return [
    0,
    'ellipsis-start',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    'ellipsis-end',
    totalPages - 1,
  ];
}

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
  const visiblePages = getVisiblePages(page, totalPages);

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

        {visiblePages.map((item) => {
          if (typeof item === 'string') {
            return (
              <span key={item} className={styles.ellipsis} aria-hidden="true">
                …
              </span>
            );
          }
          const isActive = item === page;
          return (
            <button
              key={item}
              type="button"
              className={isActive ? `${styles.pageButton} ${styles.active}` : styles.pageButton}
              disabled={disabled || isActive}
              onClick={() => onChange(item)}
              aria-current={isActive ? 'page' : undefined}
            >
              {item + 1}
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
