import { ClipboardIcon, SearchIcon, WarningIcon } from './NhuCauIcons';
import styles from './NhuCauListStates.module.css';

const SKELETON_KEYS = ['skeleton-1', 'skeleton-2', 'skeleton-3'];

export function NhuCauLoading() {
  return (
    <div className={styles.loading} role="status" aria-busy="true">
      <p className={styles.loadingText}>
        <span className={styles.spinner} aria-hidden="true" />
        Đang tải danh sách nhu cầu...
      </p>
      <ul className={styles.skeletonList} aria-hidden="true">
        {SKELETON_KEYS.map((key) => (
          <li key={key} className={styles.skeletonCard}>
            <span className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <span className={styles.skeletonRow}>
              <span className={`${styles.skeleton} ${styles.skeletonCell}`} />
              <span className={`${styles.skeleton} ${styles.skeletonCell}`} />
              <span className={`${styles.skeleton} ${styles.skeletonCell}`} />
            </span>
            <span className={`${styles.skeleton} ${styles.skeletonLine}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NhuCauEmpty() {
  return (
    <div className={styles.panel}>
      <span className={styles.illustration}>
        <ClipboardIcon className={styles.illustrationIcon} />
      </span>
      <p className={styles.title}>Bạn chưa có nhu cầu nào</p>
    </div>
  );
}

export function NhuCauNoResult({ onClearFilter }) {
  return (
    <div className={styles.panel}>
      <span className={styles.illustration}>
        <SearchIcon className={styles.illustrationIcon} />
      </span>
      <p className={styles.title}>Không tìm thấy thông tin.</p>
      <button type="button" className={styles.secondaryButton} onClick={onClearFilter}>
        Xóa bộ lọc
      </button>
    </div>
  );
}

export function NhuCauError({ onRetry }) {
  return (
    <div className={styles.panel} role="alert">
      <span className={`${styles.illustration} ${styles.illustrationError}`}>
        <WarningIcon className={styles.illustrationIcon} />
      </span>
      <p className={styles.title}>Không thể tải danh sách nhu cầu</p>
      <p className={styles.text}>Đã có lỗi khi tải dữ liệu. Vui lòng thử lại.</p>
      <button type="button" className={styles.primaryButton} onClick={onRetry}>
        Thử lại
      </button>
    </div>
  );
}
