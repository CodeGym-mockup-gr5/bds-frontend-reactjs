import { useNavigate } from 'react-router-dom';
import NhanVienFilterCard from '../components/NhanVienFilterCard';
import { PlusIcon } from '../components/NhanVienIcons';
import {
  NhanVienEmptyData,
  NhanVienEmptySearch,
  NhanVienError,
  NhanVienLoading,
} from '../components/NhanVienListStates';
import NhanVienPagination from '../components/NhanVienPagination';
import NhanVienTable from '../components/NhanVienTable';
import XoaNhanVienModal from '../components/XoaNhanVienModal';
import useDanhSachNhanVien from '../hooks/useDanhSachNhanVien';
import useXoaNhanVien from '../hooks/useXoaNhanVien';
import scrollToTop from '../../../utils/scrollUtils';
import styles from './DanhSachNhanVienPage.module.css';

export default function DanhSachNhanVienPage() {
  const navigate = useNavigate();

  const {
    draftFilter,
    changeDraft,
    applyFilter,
    isFiltered,
    page,
    setPage,
    items,
    totalElements,
    totalPages,
    pageSize,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
    refetch,
  } = useDanhSachNhanVien();

  const { selectedEmployee, isDeleting, openDeleteModal, closeDeleteModal, confirmDelete } =
    useXoaNhanVien();

  const handleAddNew = () => {
    navigate('/admin/nhan-vien/them-moi');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    scrollToTop();
  };

  const handleApplyFilter = (e) => {
    applyFilter(e);
    scrollToTop();
  };

  const renderContent = () => {
    if (isError) {
      return <NhanVienError onRetry={() => refetch()} />;
    }

    if (isPending || isPlaceholderData) {
      return <NhanVienLoading />;
    }

    if (!isPlaceholderData && totalElements === 0) {
      if (isFiltered) {
        return <NhanVienEmptySearch />;
      }
      return <NhanVienEmptyData onAddNew={handleAddNew} />;
    }

    return (
      <>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Danh sách nhân viên</h2>
          <span className={styles.cardCount}>{`${totalElements} nhân viên`}</span>
        </div>
        <NhanVienTable
          items={items}
          onEdit={(nv) => navigate(`/admin/nhan-vien/${nv.id}/sua`)}
          onDelete={openDeleteModal}
        />
        <NhanVienPagination
          page={page}
          pageSize={pageSize}
          totalElements={totalElements}
          totalPages={totalPages}
          disabled={isFetching}
          onChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản lý nhân viên</h1>
        <button type="button" className={styles.addButton} onClick={handleAddNew}>
          <PlusIcon size={16} />
          <span>Thêm mới</span>
        </button>
      </div>

      <NhanVienFilterCard
        filter={draftFilter}
        onChange={changeDraft}
        onSubmit={handleApplyFilter}
      />

      <div className={styles.card}>{renderContent()}</div>

      <XoaNhanVienModal
        employee={selectedEmployee}
        isDeleting={isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
