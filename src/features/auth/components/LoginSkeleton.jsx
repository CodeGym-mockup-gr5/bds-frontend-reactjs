import styles from './LoginForm.module.css';

export default function LoginSkeleton() {
  return (
    <div className={styles.skeletonContainer} aria-busy="true" aria-label="Đang tải form đăng nhập">
      <div className={styles.skeletonGroup}>
        <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
        <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
      </div>

      <div className={styles.skeletonGroup}>
        <div className={`${styles.skeleton} ${styles.skeletonLabelShort}`} />
        <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
      </div>

      <div className={styles.skeletonRow}>
        <div className={styles.skeletonCheckGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonCheckbox}`} />
          <div className={`${styles.skeleton} ${styles.skeletonCheckLabel}`} />
        </div>
        <div className={`${styles.skeleton} ${styles.skeletonLink}`} />
      </div>

      <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
    </div>
  );
}
