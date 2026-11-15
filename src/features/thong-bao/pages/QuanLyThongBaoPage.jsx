import { useId } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Icon';
import ThongBaoPagination from '../components/ThongBaoPagination';
import { ThongBaoEmpty, ThongBaoError, ThongBaoLoading } from '../components/ThongBaoListStates';
import ThongBaoTable from '../components/ThongBaoTable';
import useChonThongBao from '../hooks/useChonThongBao';
import useDanhSachThongBao from '../hooks/useDanhSachThongBao';
import styles from './QuanLyThongBaoPage.module.css';

function ThongBaoResults({ danhSach, chon }) {
  if (danhSach.isError) return <ThongBaoError onRetry={() => danhSach.refetch()} />;
  if (danhSach.isPending) return <ThongBaoLoading />;
  if (danhSach.totalElements === 0) return <ThongBaoEmpty />;

  const isUpdating = danhSach.isFetching && danhSach.isPlaceholderData;

  const handleChangePage = (nextPage) => {
    chon.clearSelection();
    danhSach.setPage(nextPage);
  };

  return (
    <ThongBaoTable
      items={danhSach.items}
      selectedIds={chon.selectedIds}
      isUpdating={isUpdating}
      onToggleOne={chon.toggleOne}
      onToggleAll={chon.toggleAll}
      footer={
        <ThongBaoPagination
          page={danhSach.page}
          size={danhSach.size}
          itemCount={danhSach.items.length}
          totalElements={danhSach.totalElements}
          totalPages={danhSach.totalPages}
          disabled={isUpdating}
          onChange={handleChangePage}
        />
      }
    />
  );
}

export default function QuanLyThongBaoPage() {
  const titleId = useId();
  const danhSach = useDanhSachThongBao();
  const chon = useChonThongBao(danhSach.items);

  return (
    <section className={styles.page} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h1 id={titleId} className={styles.title}>
          Danh sách thông báo
        </h1>
        <p className={styles.description}>Quản lý và cập nhật thông báo nội bộ của trung tâm.</p>
      </header>

      <div className={styles.toolbar}>
        <button type="button" className={styles.primaryButton}>
          <Icon name="plus" />
          Thêm mới thông báo
        </button>
        <button type="button" className={styles.dangerButton}>
          <Icon name="trash" />
          Xóa nhiều
        </button>
      </div>

      <ThongBaoResults danhSach={danhSach} chon={chon} />

      <div className={styles.back}>
        <Link to="/admin" className={styles.backLink}>
          <Icon name="back" />
          Quay lại
        </Link>
      </div>
    </section>
  );
}
