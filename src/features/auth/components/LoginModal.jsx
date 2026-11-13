import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import styles from './LoginModal.module.css';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    previousActiveElementRef.current = document.activeElement;

    const timer = setTimeout(() => {
      const firstInput = modalRef.current?.querySelector('input:not(:disabled)');
      if (firstInput) {
        firstInput.focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }
    }, 0);

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusables = modalRef.current?.querySelectorAll(
          'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    function handleBackdropClick(event) {
      if (event.target === backdropRef.current) {
        onClose();
      }
    }

    const backdropElement = backdropRef.current;
    if (backdropElement) {
      backdropElement.addEventListener('click', handleBackdropClick);
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      if (backdropElement) {
        backdropElement.removeEventListener('click', handleBackdropClick);
      }
      if (previousActiveElementRef.current?.focus) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={backdropRef} className={styles.backdrop}>
      <div
        ref={modalRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Đăng nhập"
        tabIndex={-1}
      >
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Đóng">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
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

        <LoginForm onSuccess={onSuccess} onNavigateAway={onClose} />
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
