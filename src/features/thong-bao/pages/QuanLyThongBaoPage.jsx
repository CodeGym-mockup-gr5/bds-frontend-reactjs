import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/Icon';
import useAuth from '../../../hooks/useAuth';
import ThongBaoPagination from '../components/ThongBaoPagination';
import { ThongBaoEmpty, ThongBaoError, ThongBaoLoading } from '../components/ThongBaoListStates';
import ThongBaoFormModal from '../components/ThongBaoFormModal';
import ThongBaoTable from '../components/ThongBaoTable';
import XoaThongBaoModal from '../components/XoaThongBaoModal';
import useChonThongBao from '../hooks/useChonThongBao';
import useDanhSachThongBao from '../hooks/useDanhSachThongBao';
import { useThemThongBao } from '../hooks/useThongBaoMutations';
import useXoaThongBao from '../hooks/useXoaThongBao';
import { EMPTY_THONG_BAO_FORM } from '../utils/thongBaoValidation';
import styles from './QuanLyThongBaoPage.module.css';

function ThongBaoResults({ danhSach, chon, onAdd, onDelete }) {
  if (danhSach.isError) return <ThongBaoError onRetry={() => danhSach.refetch()} />;
  if (danhSach.isPending) return <ThongBaoLoading />;
  if (danhSach.totalElements === 0) return <ThongBaoEmpty onAdd={onAdd} />;

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
      onDelete={(item) => onDelete([item])}
      footer={
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
      }
    />
  );
}

export default function QuanLyThongBaoPage() {
  const titleId = useId();
  const danhSach = useDanhSachThongBao();
  const chon = useChonThongBao(danhSach.items);
  const { showToast } = useAuth();
  const xoaMutation = useXoaThongBao();
  const themMutation = useThemThongBao();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreated = (response) => {
    setIsFormOpen(false);
    chon.clearSelection();
    danhSach.setPage(0);
    showToast(response?.message || 'Thêm thông báo thành công', 'success');
  };

  const handleDeleteSelected = () => {
    const selected = danhSach.items.filter((item) => chon.selectedIds.includes(item.id));
    if (selected.length === 0) {
      showToast('Chưa chọn dữ liệu để xóa', 'error');
      return;
    }
    setDeleteTarget({ items: selected });
  };

  const handleConfirmDelete = () => {
    const ids = deleteTarget.items.map((item) => item.id);
    xoaMutation.mutate(ids, {
      onSuccess: (result) => {
        setDeleteTarget(null);
        chon.clearSelection();
        if (result.failedCount === 0) {
          showToast('Xóa thành công', 'success');
        } else {
          showToast(result.errorMessage, 'error');
        }
      },
    });
  };

  return (
    <section className={styles.page} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h1 id={titleId} className={styles.title}>
          Danh sách thông báo
        </h1>
        <p className={styles.description}>Quản lý và cập nhật thông báo nội bộ của trung tâm.</p>
      </header>

      <div className={styles.toolbar}>
        <button type="button" className={styles.primaryButton} onClick={() => setIsFormOpen(true)}>
          <Icon name="plus" />
          Thêm mới thông báo
        </button>
        <button type="button" className={styles.dangerButton} onClick={handleDeleteSelected}>
          <Icon name="trash" />
          Xóa nhiều
        </button>
      </div>

      <ThongBaoResults
        danhSach={danhSach}
        chon={chon}
        onAdd={() => setIsFormOpen(true)}
        onDelete={(items) => setDeleteTarget({ items })}
      />

      <div className={styles.back}>
        <Link to="/admin" className={styles.backLink}>
          <Icon name="back" />
          Quay lại
        </Link>
      </div>

      {isFormOpen && (
        <ThongBaoFormModal
          isOpen
          title="Thêm mới thông báo"
          initialValues={EMPTY_THONG_BAO_FORM}
          mutation={themMutation}
          onSuccess={handleCreated}
          onError={(message) => showToast(message, 'error')}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <XoaThongBaoModal
        target={deleteTarget}
        isLoading={xoaMutation.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}
