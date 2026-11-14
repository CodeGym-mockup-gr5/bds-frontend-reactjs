import { QUYEN_DANG_TIN } from '../hooks/useQuyenDangTin';
import { WarningIcon } from './DangTinIcons';
import styles from './QuyenDangTinNotice.module.css';

export default function QuyenDangTinNotice({ quyen, onOpenYeuCau, onRetry }) {
  if (quyen === QUYEN_DANG_TIN.DA_DUYET) return null;

  if (quyen === QUYEN_DANG_TIN.DANG_TAI) {
    return (
      <div className={styles.notice} role="status" aria-busy="true">
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.text}>Đang kiểm tra quyền đăng tin...</p>
      </div>
    );
  }

  if (quyen === QUYEN_DANG_TIN.CHO_DUYET) {
    return (
      <div className={`${styles.notice} ${styles.noticeWarning}`} role="status">
        <WarningIcon className={styles.warningIcon} />
        <p className={styles.title}>Tài khoản đang chờ Admin duyệt để đăng tin bán</p>
      </div>
    );
  }

  if (quyen === QUYEN_DANG_TIN.CHUA_DANG_KY) {
    return (
      <div className={`${styles.notice} ${styles.noticeInfo}`} role="status">
        <div className={styles.body}>
          <p className={styles.title}>Bạn chưa đăng ký đăng tin bán</p>
          <p className={styles.text}>
            Gửi yêu cầu để Admin duyệt, sau khi được duyệt bạn có thể đăng tin.
          </p>
        </div>
        <button type="button" className={styles.actionButton} onClick={onOpenYeuCau}>
          Gửi yêu cầu đăng tin bán
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.notice} ${styles.noticeError}`} role="alert">
      <WarningIcon className={styles.errorIcon} />
      <p className={`${styles.text} ${styles.body}`}>
        Không thể xác nhận quyền đăng tin lúc này. Vui lòng thử lại.
      </p>
      <button type="button" className={styles.actionButton} onClick={onRetry}>
        Thử lại
      </button>
    </div>
  );
}
