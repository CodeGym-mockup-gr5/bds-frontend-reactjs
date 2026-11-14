import { useId } from 'react';
import styles from './DangTinSidebar.module.css';

export default function CompletionCard({ percent, missingLabels }) {
  const titleId = useId();
  const isComplete = missingLabels.length === 0;

  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <div className={styles.completionHeader}>
        <h2 id={titleId} className={styles.cardTitle}>
          Mức độ hoàn thành
        </h2>
        <span className={styles.percent}>{`${percent}%`}</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-labelledby={titleId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className={styles.bar} style={{ width: `${percent}%` }} />
      </div>
      <p className={isComplete ? styles.completeText : styles.missingText}>
        {isComplete ? 'Đã đủ thông tin bắt buộc' : `Còn thiếu: ${missingLabels.join(', ')}`}
      </p>
    </section>
  );
}
