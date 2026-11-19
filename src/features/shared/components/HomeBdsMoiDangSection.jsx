import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '../../../components/Icons';
import BatDongSanCard from '../../bat-dong-san/components/BatDongSanCard';
import BatDongSanCardSkeleton from '../../bat-dong-san/components/BatDongSanCardSkeleton';
import { ErrorBanner } from '../../bat-dong-san/components/ListState';
import useBdsMoiDang from '../../bat-dong-san/hooks/useBdsMoiDang';
import styles from './HomeBdsMoiDangSection.module.css';

const BDS_LIMIT = 4;
const SKELETON_KEYS = Array.from({ length: BDS_LIMIT }, (_, index) => `sk-${index + 1}`);

function HomeBdsMoiDangBody() {
  const { items, isPending, isError, isFetching, refetch } = useBdsMoiDang(BDS_LIMIT);

  if (isPending) {
    return (
      <div
        className={styles.grid}
        role="status"
        aria-label="Đang tải bất động sản mới đăng"
        aria-busy="true"
      >
        {SKELETON_KEYS.map((key) => (
          <BatDongSanCardSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorBanner
        title="Không thể tải bất động sản mới đăng"
        message="Đã có lỗi khi tải dữ liệu. Vui lòng thử lại."
        actionLabel={isFetching ? 'Đang tải...' : 'Thử lại'}
        onAction={isFetching ? undefined : () => refetch()}
      />
    );
  }

  if (items.length === 0) {
    return <p className={styles.empty}>Chưa có tin đăng nào.</p>;
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <BatDongSanCard key={item.id} batDongSan={item} />
      ))}
    </div>
  );
}

export default function HomeBdsMoiDangSection() {
  return (
    <section className={styles.section} aria-labelledby="home-bds-moi-dang-title">
      <div className={styles.header}>
        <h2 id="home-bds-moi-dang-title" className={styles.heading}>
          Bất động sản mới đăng
        </h2>
        <Link to="/bat-dong-san" className={styles.viewAll}>
          Xem tất cả
          <ChevronRightIcon size={16} />
        </Link>
      </div>
      <HomeBdsMoiDangBody />
    </section>
  );
}
