import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNhanVienById } from '../../../api/nhanVienApi';
import useAuth from '../../../hooks/useAuth';
import { NHAN_VIEN_QUERY_KEY } from '../constants/nhanVienConstants';
import { NhanVienError, NhanVienLoading } from '../components/NhanVienListStates';
import SuaNhanVienForm from '../components/SuaNhanVienForm';
import styles from './SuaNhanVienPage.module.css';

export default function SuaNhanVienPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useAuth();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: [NHAN_VIEN_QUERY_KEY, id],
    queryFn: () => getNhanVienById(id),
    enabled: Boolean(id),
  });

  const employee = data?.data;

  const handleCancel = () => {
    navigate('/admin/nhan-vien');
  };

  const handleSuccess = () => {
    showToast('Sửa thông tin nhân viên thành công', 'success');
    navigate('/admin/nhan-vien');
  };

  const renderContent = () => {
    if (isError || (!isPending && !employee)) {
      return (
        <div className={styles.card}>
          <NhanVienError onRetry={() => refetch()} />
        </div>
      );
    }

    if (isPending || !employee) {
      return (
        <div className={styles.card}>
          <NhanVienLoading />
        </div>
      );
    }

    return (
      <SuaNhanVienForm
        key={employee.id}
        employee={employee}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    );
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Chỉnh sửa thông tin nhân viên</h1>
      </header>
      {renderContent()}
    </div>
  );
}
