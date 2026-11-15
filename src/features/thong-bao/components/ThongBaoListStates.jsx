import Icon from '../../../components/Icon';
import styles from './ThongBaoListStates.module.css';

const SKELETON_KEYS = Array.from({ length: 10 }, (_, index) => `skeleton-${index + 1}`);

export function ThongBaoLoading() {
  return (
    <div className={styles.card} role="status" aria-busy="true">
      <p className={styles.srOnly}>Đang tải danh sách thông báo...</p>
      <ul className={styles.skeletonList} aria-hidden="true">
        {SKELETON_KEYS.map((key) => (
          <li key={key} className={styles.skeletonRow}>
            <span className={`${styles.skeleton} ${styles.skeletonCheck}`} />
            <span className={`${styles.skeleton} ${styles.skeletonDate}`} />
            <span className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <span className={`${styles.skeleton} ${styles.skeletonContent}`} />
            <span className={`${styles.skeleton} ${styles.skeletonActions}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ThongBaoEmpty({ onAdd }) {
  return (
    <div className={`${styles.card} ${styles.panel}`}>
      <span className={styles.illustration}>
        <Icon name="clipboard" size={32} />
      </span>
      <p className={styles.title}>Chưa có thông báo nào</p>
      <button type="button" className={styles.primaryButton} onClick={onAdd}>
        <Icon name="plus" />
        Thêm mới thông báo
      </button>
    </div>
  );
}

export function ThongBaoError({ onRetry }) {
  return (
    <div className={`${styles.card} ${styles.panel}`} role="alert">
      <span className={`${styles.illustration} ${styles.illustrationError}`}>
        <Icon name="warning" size={32} />
      </span>
      <p className={styles.title}>Không thể tải danh sách thông báo</p>
      <p className={styles.text}>Đã có lỗi khi tải dữ liệu. Vui lòng thử lại.</p>
      <button type="button" className={styles.primaryButton} onClick={onRetry}>
        Thử lại
      </button>
    </div>
  );
}
