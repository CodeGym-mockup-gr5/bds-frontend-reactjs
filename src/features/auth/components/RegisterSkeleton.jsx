import styles from './RegisterForm.module.css';

export default function RegisterSkeleton() {
  return (
    <div className={styles.skeletonContainer} aria-busy="true" aria-label="Đang tải form đăng ký">
      <div className={styles.rowTwoCols}>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
      </div>

      <div className={styles.rowTwoCols}>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
      </div>

      <div className={styles.skeletonGroup}>
        <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
        <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
      </div>

      <div className={styles.rowTwoCols}>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
      </div>

      <div className={`${styles.skeleton} ${styles.skeletonCheckboxBox}`} />

      <div className={styles.skeletonActions}>
        <div className={`${styles.skeleton} ${styles.skeletonBtnCancel}`} />
        <div className={`${styles.skeleton} ${styles.skeletonBtnSubmit}`} />
      </div>
    </div>
  );
}
