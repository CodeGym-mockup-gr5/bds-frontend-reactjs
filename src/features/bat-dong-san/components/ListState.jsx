import { AlertIcon, ResetIcon, SearchXIcon } from '../../../components/Icons';
import { EMPTY_MESSAGE } from '../constants';
import styles from './ListState.module.css';

export function EmptyState({
  title = EMPTY_MESSAGE,
  description = '',
  actionLabel = '',
  onAction,
}) {
  return (
    <div className={styles.empty} role="status">
      <span className={styles.emptyIcon}>
        <SearchXIcon size={24} />
      </span>
      <p className={styles.emptyTitle}>{title}</p>
      {description && <p className={styles.emptyText}>{description}</p>}
      {actionLabel && onAction && (
        <button type="button" className={styles.secondaryButton} onClick={onAction}>
          <ResetIcon size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function ErrorBanner({ title, message, actionLabel = '', onAction }) {
  return (
    <div className={styles.banner} role="alert">
      <AlertIcon size={20} className={styles.bannerIcon} />
      <div className={styles.bannerContent}>
        <p className={styles.bannerTitle}>{title}</p>
        <p className={styles.bannerText}>{message}</p>
      </div>
      {actionLabel && onAction && (
        <button type="button" className={styles.secondaryButton} onClick={onAction}>
          <ResetIcon size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
