import pageStyles from '../pages/BatDongSanDetailPage.module.css';
import styles from './Skeleton.module.css';

const ROW_KEYS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'];

export default function BatDongSanDetailSkeleton() {
  return (
    <div className={pageStyles.layout} aria-busy="true" aria-label="Đang tải">
      <div
        className={`${styles.block} ${pageStyles.galleryArea} ${pageStyles.galleryPlaceholder}`}
      />
      <div className={pageStyles.side}>
        <div className={pageStyles.card}>
          <div className={`${styles.block} ${styles.line} ${styles.short}`} />
          <div className={`${styles.block} ${styles.lineLg} ${styles.medium}`} />
          <div className={`${styles.block} ${styles.line}`} />
          <div className={`${styles.block} ${styles.line} ${styles.medium}`} />
        </div>
      </div>
      <div className={`${pageStyles.infoArea} ${pageStyles.card}`}>
        <div className={`${styles.block} ${styles.lineLg} ${styles.medium}`} />
        {ROW_KEYS.map((key) => (
          <div key={key} className={`${styles.block} ${styles.line}`} />
        ))}
      </div>
    </div>
  );
}
