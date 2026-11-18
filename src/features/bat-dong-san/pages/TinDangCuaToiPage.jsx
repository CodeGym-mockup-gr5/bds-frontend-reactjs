import { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import AccountTabs from '../../shared/layout/components/AccountTabs';
import BatDongSanCard from '../components/BatDongSanCard';
import BatDongSanCardSkeleton from '../components/BatDongSanCardSkeleton';
import { EmptyState, ErrorBanner } from '../components/ListState';
import { SKELETON_COUNT } from '../constants/batDongSanList';
import useQuyenDangTin from '../hooks/useQuyenDangTin';
import useTinDangCuaToi from '../hooks/useTinDangCuaToi';
import styles from './TinDangCuaToiPage.module.css';

const SKELETON_KEYS = Array.from({ length: SKELETON_COUNT }, (_, index) => `skeleton-${index}`);

function TinDangResults({ danhSach, canDangTin, onChangePage }) {
  const navigate = useNavigate();

  if (danhSach.isLoading) {
    return (
      <div className={styles.grid} role="status" aria-busy="true" aria-label="Đang tải tin đăng">
        {SKELETON_KEYS.map((key) => (
          <BatDongSanCardSkeleton key={key} />
        ))}
      </div>
    );
  }

  if (danhSach.isError && !danhSach.items.length) {
    return (
      <ErrorBanner
        title="Không tải được tin đăng"
        message="Đã có lỗi kết nối hoặc máy chủ. Vui lòng thử lại."
        actionLabel="Thử lại"
        onAction={danhSach.refetch}
      />
    );
  }

  if (!danhSach.items.length) {
    return (
      <EmptyState
        title="Bạn chưa có tin đăng nào."
        actionLabel={canDangTin ? 'Đăng tin' : ''}
        onAction={() => navigate('/dang-tin')}
      />
    );
  }

  return (
    <>
      <div
        className={`${styles.grid} ${danhSach.isPlaceholderData ? styles.stale : ''}`}
        aria-busy={danhSach.isFetching}
      >
        {danhSach.items.map((item) => (
          <BatDongSanCard key={item.id} batDongSan={item} />
        ))}
      </div>
      <Pagination
        page={danhSach.page}
        totalPages={danhSach.totalPages}
        onChange={onChangePage}
        disabled={danhSach.isFetching}
      />
    </>
  );
}

export default function TinDangCuaToiPage() {
  const danhSach = useTinDangCuaToi();
  const { canDangTin } = useQuyenDangTin();
  const titleId = useId();

  const handleChangePage = (nextPage) => {
    danhSach.setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.page} aria-labelledby={titleId}>
      <AccountTabs />
      <header className={styles.header}>
        <h1 id={titleId} className={styles.title}>
          Tin đăng của tôi
        </h1>
        <p className={styles.description}>Các bất động sản đang rao bán của bạn.</p>
      </header>

      <div className={styles.results}>
        <TinDangResults
          danhSach={danhSach}
          canDangTin={canDangTin}
          onChangePage={handleChangePage}
        />
      </div>
    </section>
  );
}
