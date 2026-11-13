import styles from '../pages/DangTinPage.module.css';

export default function FormActions({ isSubmitting, isSubmitDisabled = false, onCancel }) {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Hủy
      </button>
      <button
        type="submit"
        className={styles.primaryButton}
        disabled={isSubmitting || isSubmitDisabled}
        aria-busy={isSubmitting}
      >
        {isSubmitting && <span className={styles.spinner} aria-hidden="true" />}
        {isSubmitting ? 'Đang đăng tin...' : 'Đăng tin'}
      </button>
    </div>
  );
}
