import PropTypes from 'prop-types';
import Modal from '../../../../components/Modal';
import styles from './YeuCauDangTinModal.module.css';

export default function YeuCauDangTinModal({ isOpen, isLoading = false, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? undefined : onClose}
      title="Xác nhận đăng tin bán"
      footer={
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            Đóng
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </button>
        </div>
      }
    >
      <p className={styles.message}>Bạn muốn đăng tin bán? Yêu cầu sẽ gửi Admin duyệt.</p>
    </Modal>
  );
}

YeuCauDangTinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

YeuCauDangTinModal.defaultProps = {
  isLoading: false,
};
