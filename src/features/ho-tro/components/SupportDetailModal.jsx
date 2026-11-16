import Modal from '../../../components/Modal';
import styles from './SupportDetailModal.module.css';

export default function SupportDetailModal({ isOpen, item, onClose }) {
  if (!item) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item.tieuDe}
      maxWidth="560px"
      footer={
        <button type="button" className={styles.closeFooterButton} onClick={onClose}>
          Đóng
        </button>
      }
    >
      <p className={styles.modalDescription}>{item.moTa}</p>

      <ol className={styles.stepsList}>
        {item.cacBuoc?.map((buoc, index) => (
          <li key={buoc.tieuDeBuoc} className={styles.stepItem}>
            <span className={styles.stepBadge}>{index + 1}</span>
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>{buoc.tieuDeBuoc}</h4>
              <p className={styles.stepDetail}>{buoc.noiDung}</p>
            </div>
          </li>
        ))}
      </ol>
    </Modal>
  );
}
