import { UserIcon, DocumentIcon, LockIcon, HandshakeIcon, ArrowRightIcon } from './SupportIcons';
import styles from './SupportCard.module.css';

function renderIcon(iconType) {
  switch (iconType) {
    case 'user':
      return <UserIcon className={styles.icon} />;
    case 'document':
      return <DocumentIcon className={styles.icon} />;
    case 'lock':
      return <LockIcon className={styles.icon} />;
    case 'handshake':
      return <HandshakeIcon className={styles.icon} />;
    default:
      return null;
  }
}

export default function SupportCard({ item, onSelect }) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrapper}>{renderIcon(item.icon)}</div>

      <div className={styles.content}>
        <h3 className={styles.title}>{item.tieuDe}</h3>
        <p className={styles.description}>{item.moTa}</p>

        <button
          type="button"
          className={styles.actionButton}
          onClick={() => onSelect(item)}
          aria-label={`Xem ${item.tieuDe}`}
        >
          <span>Xem hướng dẫn</span>
          <ArrowRightIcon className={styles.arrowIcon} />
        </button>
      </div>
    </article>
  );
}
