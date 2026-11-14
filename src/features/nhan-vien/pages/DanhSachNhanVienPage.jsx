import { useNavigate } from 'react-router-dom';
import NhanVienFilterCard from '../components/NhanVienFilterCard';
import { ChevronLeftIcon, PlusIcon } from '../components/NhanVienIcons';
import {
  NhanVienEmptyData,
  NhanVienEmptySearch,
  NhanVienError,
  NhanVienLoading,
} from '../components/NhanVienListStates';
import NhanVienPagination from '../components/NhanVienPagination';
import NhanVienTable from '../components/NhanVienTable';
import useDanhSachNhanVien from '../hooks/useDanhSachNhanVien';
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
    isError,
    refetch,
  } = useDanhSachNhanVien();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddNew = () => {
    navigate('/admin/nhan-vien/them-moi');
  };

  const renderContent = () => {
    if (isError) {
      return <NhanVienError onRetry={() => refetch()} />;
    }

    if (isPending) {
      return <NhanVienLoading />;
    }

    if (totalElements === 0) {
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
        <NhanVienTable items={items} />
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

      <NhanVienFilterCard filter={draftFilter} onChange={changeDraft} onSubmit={applyFilter} />

      <div className={styles.card}>{renderContent()}</div>

      <button type="button" className={styles.backButton} onClick={handleBack}>
        <ChevronLeftIcon size={16} />
        <span>Quay lại</span>
      </button>
    </div>
  );
}
