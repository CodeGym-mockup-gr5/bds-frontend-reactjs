import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useYeuCauDangTin from '../../../hooks/useYeuCauDangTin';

export const QUYEN_DANG_TIN = {
  DANG_TAI: 'dangTai',
  KHONG_XAC_DINH: 'khongXacDinh',
  CHUA_DANG_KY: 'chuaDangKy',
  CHO_DUYET: 'choDuyet',
  DA_DUYET: 'daDuyet',
};

const YEU_CAU_SUCCESS = 'Đã gửi yêu cầu đăng tin bán, vui lòng chờ Admin duyệt';
const YEU_CAU_ERROR = 'Không thể gửi yêu cầu đăng tin bán lúc này';

function resolveQuyen(user, isLoading, isError) {
  if (isLoading) return QUYEN_DANG_TIN.DANG_TAI;
  if (isError || typeof user?.laKhBan !== 'boolean') return QUYEN_DANG_TIN.KHONG_XAC_DINH;
  if (!user.laKhBan) return QUYEN_DANG_TIN.CHUA_DANG_KY;
  return user.trangThaiDuyet === 'DA_DUYET' ? QUYEN_DANG_TIN.DA_DUYET : QUYEN_DANG_TIN.CHO_DUYET;
}

export default function useQuyenDangTin() {
  const { user, isSellerStatusLoading, isSellerStatusError, refetchMe, showToast } = useAuth();
  const yeuCauMutation = useYeuCauDangTin();
  const [isYeuCauModalOpen, setIsYeuCauModalOpen] = useState(false);

  const quyen = resolveQuyen(user, isSellerStatusLoading, isSellerStatusError);

  const confirmYeuCau = () => {
    yeuCauMutation.mutate(undefined, {
      onSuccess: (response) => {
        setIsYeuCauModalOpen(false);
        showToast(response?.message || YEU_CAU_SUCCESS, 'success');
      },
      onError: (error) => {
        setIsYeuCauModalOpen(false);
        showToast(error?.response?.data?.message || YEU_CAU_ERROR, 'error');
      },
    });
  };

  return {
    user,
    quyen,
    canDangTin: quyen === QUYEN_DANG_TIN.DA_DUYET,
    refetchQuyen: refetchMe,
    isYeuCauModalOpen,
    isYeuCauPending: yeuCauMutation.isPending,
    openYeuCauModal: () => setIsYeuCauModalOpen(true),
    closeYeuCauModal: () => setIsYeuCauModalOpen(false),
    confirmYeuCau,
  };
}
