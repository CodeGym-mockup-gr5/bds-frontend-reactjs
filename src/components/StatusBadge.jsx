import styles from './StatusBadge.module.css';

const STATUS = {
  CO_SAN: { label: 'Có sẵn', tone: 'success' },
  DA_BAN: { label: 'Đã bán', tone: 'neutral' },
};

export default function StatusBadge({ tinhTrang, className = '' }) {
  const status = STATUS[tinhTrang];
  if (!status) {
    return null;
  }

  return (
    <span className={`${styles.badge} ${className}`.trim()}>
      <span className={`${styles.dot} ${styles[status.tone]}`} aria-hidden="true" />
      {status.label}
    </span>
  );
}
