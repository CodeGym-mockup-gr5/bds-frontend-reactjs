import { Link } from 'react-router-dom';
import Icon from '../../../components/Icon';
import styles from './ThongBaoFeedStates.module.css';

const SKELETON_ROWS = ['row-1', 'row-2', 'row-3', 'row-4'];

export function ThongBaoFeedLoading() {
  return (
    <div className={styles.card} role="status" aria-busy="true">
      <p className={styles.srOnly}>Đang tải danh sách thông báo...</p>
      <ul className={styles.skeletonList} aria-hidden="true">
        {SKELETON_ROWS.map((key) => (
          <li key={key} className={styles.skeletonRow}>
            <span className={`${styles.skeleton} ${styles.skeletonDate}`} />
            <div className={styles.skeletonContent}>
              <span className={`${styles.skeleton} ${styles.skeletonTitle}`} />
              <span className={`${styles.skeleton} ${styles.skeletonText}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ThongBaoFeedEmpty() {
  return (
    <div className={`${styles.card} ${styles.panel}`}>
      <span className={styles.illustration}>
        <Icon name="bell" size={32} />
      </span>
      <p className={styles.title}>Chưa có thông báo nào</p>
      <p className={styles.text}>Hiện tại trung tâm chưa có thông báo mới nào.</p>
      <Link to="/" className={styles.secondaryLink}>
        Về trang chủ
      </Link>
    </div>
  );
}

export function ThongBaoFeedError({ onRetry }) {
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
