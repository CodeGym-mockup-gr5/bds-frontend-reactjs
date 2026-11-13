import styles from '../pages/SuaThongTinCaNhanPage.module.css';

export default function SuaThongTinCaNhanSkeleton() {
  return (
    <div
      className={styles.skeletonWrapper}
      aria-busy="true"
      aria-label="Đang tải thông tin cá nhân"
    >
      <div className={styles.skeletonGroup}>
        <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
        <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        <div className={`${styles.skeleton} ${styles.skeletonHint}`} />
      </div>

      <div className={styles.skeletonGroup}>
        <div className={`${styles.skeleton} ${styles.skeletonLabelShort}`} />
        <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
      </div>

      <div className={styles.twoColGrid}>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabelShort}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabelShort}`} />
          <div className={styles.skeletonRadioRow}>
            <div className={`${styles.skeleton} ${styles.skeletonRadioDot}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRadioText}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRadioDot}`} />
            <div className={`${styles.skeleton} ${styles.skeletonRadioText}`} />
          </div>
        </div>
      </div>

      <div className={styles.skeletonGroup}>
        <div className={`${styles.skeleton} ${styles.skeletonLabelShort}`} />
        <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
      </div>

      <div className={styles.twoColGrid}>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
        <div className={styles.skeletonGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonLabelShort}`} />
          <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
        </div>
      </div>

      <div className={styles.skeletonGroup}>
        <div className={`${styles.skeleton} ${styles.skeletonLabelShort}`} />
        <div className={`${styles.skeleton} ${styles.skeletonInput}`} />
      </div>

      <div className={styles.formFooter}>
        <div className={`${styles.skeleton} ${styles.skeletonCancelBtn}`} />
        <div className={`${styles.skeleton} ${styles.skeletonSubmitBtn}`} />
      </div>
    </div>
  );
}
