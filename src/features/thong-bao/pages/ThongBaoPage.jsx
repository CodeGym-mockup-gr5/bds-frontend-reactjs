import { useId } from 'react';
import { Link } from 'react-router-dom';
import ThongBaoFeedList from '../components/ThongBaoFeedList';
import {
  ThongBaoFeedEmpty,
  ThongBaoFeedError,
  ThongBaoFeedLoading,
} from '../components/ThongBaoFeedStates';
import ThongBaoPagination from '../components/ThongBaoPagination';
import useDanhSachThongBao from '../hooks/useDanhSachThongBao';
import useScrollToTop from '../hooks/useScrollToTop';
import styles from './ThongBaoPage.module.css';

function ThongBaoFeedResults({ danhSach, onPageChange }) {
  if (danhSach.isError) {
    return <ThongBaoFeedError onRetry={() => danhSach.refetch()} />;
  }
  if (danhSach.isPending) {
    return <ThongBaoFeedLoading />;
  }
  if (danhSach.totalElements === 0) {
    return <ThongBaoFeedEmpty />;
  }

  const isUpdating = danhSach.isFetching && danhSach.isPlaceholderData;

  const handleChangePage = (nextPage) => {
    danhSach.setPage(nextPage);
    onPageChange();
  };

  return (
    <ThongBaoFeedList
      items={danhSach.items}
      isUpdating={isUpdating}
      footer={
        danhSach.totalPages > 1 ? (
          <ThongBaoPagination
            page={danhSach.page}
            size={danhSach.size}
            itemCount={danhSach.items.length}
            totalElements={danhSach.totalElements}
            totalPages={danhSach.totalPages}
            rangePage={danhSach.displayedPage}
            disabled={isUpdating}
            onChange={handleChangePage}
          />
        ) : null
      }
    />
  );
}

export default function ThongBaoPage() {
  const titleId = useId();
  const { ref: pageRef, scrollToTop } = useScrollToTop();
  const danhSach = useDanhSachThongBao();

  return (
    <section ref={pageRef} className={styles.page} aria-labelledby={titleId}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/" className={styles.breadcrumbLink}>
            Trang chủ
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            Thông báo
          </span>
        </nav>

        <header className={styles.header}>
          <h1 id={titleId} className={styles.title}>
            Thông báo
          </h1>
          <p className={styles.subtitle}>Cập nhật các thông báo mới nhất từ trung tâm.</p>
        </header>

        <ThongBaoFeedResults danhSach={danhSach} onPageChange={scrollToTop} />
      </div>
    </section>
  );
}
