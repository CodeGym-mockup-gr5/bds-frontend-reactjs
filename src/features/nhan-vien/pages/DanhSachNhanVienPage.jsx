import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
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
import SuaNhanVienForm from '../components/SuaNhanVienForm';
import XoaNhanVienModal from '../components/XoaNhanVienModal';
import useDanhSachNhanVien from '../hooks/useDanhSachNhanVien';
import useXoaNhanVien from '../hooks/useXoaNhanVien';
import scrollToTop from '../utils/scrollUtils';
import styles from './DanhSachNhanVienPage.module.css';

export default function DanhSachNhanVienPage() {
  const navigate = useNavigate();
  const { showToast } = useAuth();
  const [editingEmployee, setEditingEmployee] = useState(null);

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

  useEffect(() => {
    scrollToTop();
  }, [editingEmployee, page]);

  useEffect(() => {
    if (!editingEmployee) return undefined;

    const selector = 'header nav[aria-label="Đường dẫn"] li[aria-current="page"]';
    const currentItem = document.querySelector(selector);
    const prevText = currentItem ? currentItem.textContent : null;

    if (currentItem) {
      currentItem.textContent = 'Chỉnh sửa';
    }

    return () => {
      const el = currentItem || document.querySelector(selector);
      if (el) {
        el.textContent = prevText || 'Danh sách';
      }
    };
  }, [editingEmployee]);

  const handleAddNew = () => {
    navigate('/admin/nhan-vien/them-moi');
  };

  const handleApplyFilter = (e) => {
    applyFilter(e);
    scrollToTop();
  };

  if (editingEmployee) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Chỉnh sửa thông tin nhân viên</h1>
        </div>
        <SuaNhanVienForm
          key={editingEmployee.id}
          employee={editingEmployee}
          onCancel={() => setEditingEmployee(null)}
          onSuccess={() => {
            setEditingEmployee(null);
            showToast('Sửa thông tin nhân viên thành công', 'success');
          }}
        />
      </div>
    );
  }

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
        <NhanVienTable items={items} onEdit={setEditingEmployee} onDelete={openDeleteModal} />
        <NhanVienPagination
          page={page}
          pageSize={pageSize}
          totalElements={totalElements}
          totalPages={totalPages}
          disabled={isFetching}
          onChange={setPage}
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
