import { useEffect, useRef, useId } from 'react';
import styles from './Modal.module.css';

const FOCUSABLE_SELECTOR = [
  'button:not(:disabled)',
  '[href]',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export default function Modal({
  isOpen,
  onClose = null,
  title = null,
  children = null,
  footer = null,
  maxWidth = '480px',
  closeOnBackdropClick = true,
  ariaLabel = null,
}) {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const previousActiveElementRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return undefined;

    previousActiveElementRef.current = document.activeElement;

    const timer = setTimeout(() => {
      const focusables = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusables && focusables.length > 0) {
        focusables[0].focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      if (previousActiveElementRef.current?.focus) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCloseRef.current?.();
        return;
      }

      if (event.key === 'Tab') {
        const focusables = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
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
      if (closeOnBackdropClick && event.target === backdropRef.current) {
        onCloseRef.current?.();
      }
    }

    const backdropElement = backdropRef.current;
    if (backdropElement) {
      backdropElement.addEventListener('click', handleBackdropClick);
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (backdropElement) {
        backdropElement.removeEventListener('click', handleBackdropClick);
      }
    };
  }, [isOpen, closeOnBackdropClick]);

  if (!isOpen) return null;

  return (
    <div ref={backdropRef} className={styles.backdrop}>
      <div
        ref={modalRef}
        className={styles.dialog}
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title && ariaLabel ? ariaLabel : undefined}
        tabIndex={-1}
      >
        {(title || onClose) && (
          <div className={styles.header}>
            {title && (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            )}
            {onClose && (
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => onCloseRef.current?.()}
                aria-label="Đóng"
              >
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
            )}
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
