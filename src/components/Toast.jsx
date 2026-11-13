import { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ isOpen, message, type = 'success', duration = 4000, onClose }) {
  useEffect(() => {
    if (!isOpen || !message) return undefined;
    if (duration <= 0) return undefined;

    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, message, duration, onClose]);

  if (!isOpen || !message) return null;

  const isError = type === 'error';

  return (
    <aside
      className={`${styles.toast} ${isError ? styles.toastError : styles.toastSuccess}`}
      role={isError ? 'alert' : 'status'}
      aria-live="polite"
    >
      <div className={styles.iconWrapper}>
        {isError ? (
          <svg
            className={styles.iconError}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        ) : (
          <svg
            className={styles.iconSuccess}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
      </div>

      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Đóng thông báo"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </aside>
  );
}
