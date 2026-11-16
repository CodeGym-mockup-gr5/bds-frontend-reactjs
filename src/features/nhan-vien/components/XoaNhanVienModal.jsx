import Modal from '../../../components/Modal';
import { CHUC_VU_LABEL_MAP } from '../constants/nhanVienConstants';
import { TrashIcon } from './NhanVienIcons';
import styles from './XoaNhanVienModal.module.css';

export default function XoaNhanVienModal({ employee, isDeleting, onClose, onConfirm }) {
  const chucVuText = employee ? CHUC_VU_LABEL_MAP[employee.chucVu] || employee.chucVu || '' : '';

  return (
    <Modal
      isOpen={Boolean(employee)}
      onClose={isDeleting ? undefined : onClose}
      closeOnBackdropClick={false}
      title="Xóa nhân viên"
      footer={
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isDeleting}
          >
            Hủy
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            <TrashIcon size={14} />
            <span>{isDeleting ? 'Đang xóa...' : 'Xóa nhân viên'}</span>
          </button>
        </div>
      }
    >
      <div className={styles.content}>
        <p className={styles.description}>Bạn có chắc chắn muốn xóa nhân viên</p>

        <div className={styles.employeeCard}>
          <span className={styles.employeeCode}>{employee?.maNv}</span>
          <span className={styles.employeeName}>{employee?.hoTen}</span>
          <span className={styles.employeeRole}>{chucVuText}</span>
        </div>

        <p className={styles.warningText}>Hành động này không thể hoàn tác.</p>
      </div>
    </Modal>
  );
}
