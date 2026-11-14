import { PlusIcon, SearchNoResultIcon, UsersGroupIcon } from './NhanVienIcons';
import styles from './NhanVienListStates.module.css';

const SKELETON_ROWS = ['row-1', 'row-2', 'row-3', 'row-4'];

export function NhanVienLoading() {
  return (
    <div className={styles.skeletonContainer} role="status" aria-busy="true">
      <div className={styles.skeletonTitle} />
      {SKELETON_ROWS.map((key) => (
        <div key={key} className={styles.skeletonRow}>
          <div className={`${styles.skeletonBar} ${styles.colCode}`} />
          <div className={`${styles.skeletonBar} ${styles.colName}`} />
          <div className={`${styles.skeletonBar} ${styles.colDate}`} />
          <div className={`${styles.skeletonBar} ${styles.colGender}`} />
          <div className={`${styles.skeletonBar} ${styles.colPhone}`} />
          <div className={`${styles.skeletonBar} ${styles.colEmail}`} />
          <div className={`${styles.skeletonBar} ${styles.colRole}`} />
          <div className={`${styles.skeletonBar} ${styles.colAction}`} />
        </div>
      ))}
    </div>
  );
}

export function NhanVienEmptySearch() {
  return (
    <div className={styles.stateContainer} role="status">
      <SearchNoResultIcon className={styles.emptySearchIcon} size={48} />
      <p className={styles.noResultText}>Không tìm thấy thông tin.</p>
    </div>
  );
}

export function NhanVienEmptyData({ onAddNew }) {
  return (
    <div className={styles.stateContainer} role="status">
      <div className={styles.iconCircle}>
        <UsersGroupIcon size={32} />
      </div>
      <h3 className={styles.title}>Chưa có nhân viên nào</h3>
      <p className={styles.description}>Bắt đầu bằng cách thêm nhân viên đầu tiên vào hệ thống.</p>
      <button type="button" className={styles.primaryButton} onClick={onAddNew}>
        <PlusIcon size={16} />
        <span>Thêm nhân viên đầu tiên</span>
      </button>
    </div>
  );
}

export function NhanVienError({ onRetry }) {
  return (
    <div className={styles.stateContainer} role="alert">
      <h3 className={styles.title}>Không thể tải danh sách nhân viên</h3>
      <p className={styles.description}>
        Đã có lỗi xảy ra khi tải dữ liệu từ máy chủ. Vui lòng thử lại.
      </p>
      <button type="button" className={styles.primaryButton} onClick={onRetry}>
        Thử lại
      </button>
    </div>
  );
}
