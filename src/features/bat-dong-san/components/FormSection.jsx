import { useId } from 'react';
import { CheckIcon } from './DangTinIcons';
import styles from './FormSection.module.css';

const STATUS_CLASS = {
  empty: styles.statusEmpty,
  progress: styles.statusProgress,
  done: styles.statusDone,
};

function getStatusText(status) {
  if (status.state === 'done') return 'Hoàn tất';
  if (status.state === 'progress') return `Đang điền · thiếu ${status.missing} mục`;
  return 'Chưa điền';
}

export default function FormSection({ number, title, status, children }) {
  const titleId = useId();
  const isDone = status.state === 'done';

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <header className={styles.sectionHeader}>
        <span
          className={`${styles.stepBadge} ${isDone ? styles.stepBadgeDone : ''}`}
          aria-hidden="true"
        >
          {isDone ? <CheckIcon className={styles.stepIcon} /> : number}
        </span>
        <h2 id={titleId} className={styles.sectionTitle}>
          {title}
        </h2>
        <span className={`${styles.sectionStatus} ${STATUS_CLASS[status.state]}`}>
          {isDone && <CheckIcon className={styles.statusIcon} />}
          {getStatusText(status)}
        </span>
      </header>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
