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
import { useSuaThongBao, useThemThongBao } from '../hooks/useThongBaoMutations';
import useXoaThongBao from '../hooks/useXoaThongBao';
import { EMPTY_THONG_BAO_FORM, toFormValues } from '../utils/thongBaoValidation';
import styles from './QuanLyThongBaoPage.module.css';

function ThongBaoResults({ danhSach, chon, onAdd, onEdit, onDelete }) {
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
      onEdit={onEdit}
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
  const suaMutation = useSuaThongBao();
  const [formState, setFormState] = useState(null);

  const closeForm = () => setFormState(null);

  const handleCreated = (response) => {
    closeForm();
    chon.clearSelection();
    danhSach.setPage(0);
    showToast(response?.message || 'Thêm thông báo thành công', 'success');
  };

  const handleUpdated = (response) => {
    closeForm();
    showToast(response?.message || 'Sửa thông báo thành công', 'success');
  };

  const isEdit = formState?.mode === 'edit';

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
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => setFormState({ mode: 'create' })}
        >
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
        onAdd={() => setFormState({ mode: 'create' })}
        onEdit={(item) => setFormState({ mode: 'edit', item })}
        onDelete={(items) => setDeleteTarget({ items })}
      />

      <div className={styles.back}>
        <Link to="/admin" className={styles.backLink}>
          <Icon name="back" />
          Quay lại
        </Link>
      </div>

      {formState && (
        <ThongBaoFormModal
          key={isEdit ? formState.item.id : 'create'}
          isOpen
          title={isEdit ? 'Chỉnh sửa thông báo' : 'Thêm mới thông báo'}
          initialValues={isEdit ? toFormValues(formState.item) : EMPTY_THONG_BAO_FORM}
          mutation={isEdit ? suaMutation : themMutation}
          buildMutationInput={
            isEdit ? (payload) => ({ id: formState.item.id, payload }) : undefined
          }
          onSuccess={isEdit ? handleUpdated : handleCreated}
          onError={(message) => showToast(message, 'error')}
          onClose={closeForm}
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
