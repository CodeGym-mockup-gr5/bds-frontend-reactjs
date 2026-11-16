import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNhanVien } from '../../../api/nhanVienApi';
import useAuth from '../../../hooks/useAuth';
import { NHAN_VIEN_QUERY_KEY } from '../constants/nhanVienConstants';

export default function useXoaNhanVien() {
  const queryClient = useQueryClient();
  const { showToast } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const mutation = useMutation({
    mutationFn: (id) => deleteNhanVien(id),
    onSuccess: () => {
      const code = selectedEmployee?.maNv || 'Nhân viên';
      setSelectedEmployee(null);

      queryClient.invalidateQueries({ queryKey: [NHAN_VIEN_QUERY_KEY] });

      showToast(`${code} đã được xóa khỏi hệ thống.`, 'success');
    },
    onError: (error) => {
      setSelectedEmployee(null);
      const message = error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.';

      showToast(message, 'error');
    },
  });

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeDeleteModal = () => {
    if (!mutation.isPending) {
      setSelectedEmployee(null);
    }
  };

  const confirmDelete = () => {
    if (selectedEmployee?.id) {
      mutation.mutate(selectedEmployee.id);
    }
  };

  return {
    selectedEmployee,
    isDeleting: mutation.isPending,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
}
