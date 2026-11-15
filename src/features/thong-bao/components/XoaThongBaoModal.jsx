import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import styles from './XoaThongBaoModal.module.css';

export default function XoaThongBaoModal({ target, isLoading = false, onClose, onConfirm }) {
  const names = target?.items ?? [];
  const isMany = names.length > 1;

  return (
    <Modal
      isOpen={Boolean(target)}
      onClose={isLoading ? undefined : onClose}
      title="Xác nhận xóa thông báo"
      maxWidth="440px"
      footer={
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={onConfirm}
            disabled={isLoading}
          >
            <Icon name="trash" />
            {isLoading ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      }
    >
      <div className={styles.content}>
        <span className={styles.warning}>
          <Icon name="warning" size={24} />
        </span>
        <p className={styles.question}>
          {isMany
            ? `Bạn có thực sự muốn xóa ${names.length} thông báo đã chọn hay không?`
            : 'Bạn có thực sự muốn xóa hay không?'}
        </p>
        {!isMany && names[0] && <p className={styles.name}>{names[0].tenThongBao}</p>}
      </div>
    </Modal>
  );
}
