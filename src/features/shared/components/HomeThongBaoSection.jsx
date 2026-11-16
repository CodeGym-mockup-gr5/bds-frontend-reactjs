import { formatDate } from '../../../utils/format';
import { EmptyState, ErrorBanner } from '../../bat-dong-san/components/ListState';
import useThongBaoMoiNhat from '../../thong-bao/hooks/useThongBaoMoiNhat';
import styles from './HomeThongBaoSection.module.css';

const THONG_BAO_LIMIT = 5;
const SKELETON_KEYS = Array.from({ length: THONG_BAO_LIMIT }, (_, index) => `sk-${index + 1}`);

function HomeThongBaoSkeleton() {
  return (
    <div className={styles.card} role="status" aria-label="Đang tải thông báo" aria-busy="true">
      <ul className={styles.list} aria-hidden="true">
        {SKELETON_KEYS.map((key) => (
          <li key={key} className={styles.item}>
            <span className={`${styles.skeleton} ${styles.skeletonDate}`} />
            <div className={styles.content}>
              <span className={`${styles.skeleton} ${styles.skeletonTitle}`} />
              <span className={`${styles.skeleton} ${styles.skeletonText}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HomeThongBaoList({ items }) {
  return (
    <div className={styles.card}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <time dateTime={item.ngay} className={styles.date}>
              {formatDate(item.ngay)}
            </time>
            <div className={styles.content}>
              <h3 className={styles.itemTitle}>{item.tenThongBao}</h3>
              <p className={styles.itemDesc}>{item.noiDung}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HomeThongBaoBody() {
  const { items, isPending, isError, isFetching, refetch } = useThongBaoMoiNhat(THONG_BAO_LIMIT);

  if (isPending) {
    return <HomeThongBaoSkeleton />;
  }

  if (isError) {
    return (
      <ErrorBanner
        title="Không thể tải thông báo"
        message="Đã có lỗi khi tải dữ liệu. Vui lòng thử lại."
        actionLabel={isFetching ? 'Đang tải...' : 'Thử lại'}
        onAction={isFetching ? undefined : () => refetch()}
      />
    );
  }

  if (items.length === 0) {
    return <EmptyState title="Chưa có thông báo nào" />;
  }

  return <HomeThongBaoList items={items} />;
}

export default function HomeThongBaoSection() {
  return (
    <section className={styles.section} aria-labelledby="home-thong-bao-title">
      <h2 id="home-thong-bao-title" className={styles.heading}>
        Thông báo
      </h2>
      <HomeThongBaoBody />
    </section>
  );
}
