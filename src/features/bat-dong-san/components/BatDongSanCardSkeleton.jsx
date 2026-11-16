import cardStyles from './BatDongSanCard.module.css';
import styles from './Skeleton.module.css';

export default function BatDongSanCardSkeleton() {
  return (
    <div className={cardStyles.card} aria-hidden="true">
      <div className={`${cardStyles.media} ${styles.block}`} />
      <div className={cardStyles.body}>
        <div className={`${styles.block} ${styles.line} ${styles.short}`} />
        <div className={`${styles.block} ${styles.line}`} />
        <div className={`${styles.block} ${styles.lineLg} ${styles.medium}`} />
        <div className={`${styles.block} ${styles.line} ${styles.medium}`} />
        <div className={`${styles.block} ${styles.line} ${styles.short}`} />
      </div>
    </div>
  );
}
