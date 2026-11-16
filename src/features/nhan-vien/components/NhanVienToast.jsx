import { useEffect } from 'react';
import { CloseSmallIcon } from './NhanVienIcons';
import styles from './NhanVienToast.module.css';

export default function NhanVienToast({ title, message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!duration || duration <= 0) return undefined;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <aside className={styles.toast} role="status">
      <span className={styles.dot} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Đóng thông báo"
      >
        <CloseSmallIcon size={16} />
      </button>
    </aside>
  );
}
