import Modal from '../../../components/Modal';
import styles from './LogoutConfirmModal.module.css';

export default function LogoutConfirmModal({ isOpen, isLoading = false, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? undefined : onClose}
      title="Xác nhận đăng xuất"
      maxWidth="460px"
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
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng xuất...' : 'Đăng xuất'}
          </button>
        </div>
      }
    >
      <p className={styles.message}>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?</p>
    </Modal>
  );
}
