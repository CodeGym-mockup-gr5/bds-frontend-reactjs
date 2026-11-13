import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useHeader from '../../../hooks/useHeader';
import useYeuCauDangTin from '../../../hooks/useYeuCauDangTin';
import { logout as logoutApi } from '../../../api/authApi';
import { removeToken } from '../../../utils/auth';
import Toast from '../../../components/Toast';
import HeaderLogo from './components/HeaderLogo';
import HeaderNav from './components/HeaderNav';
import HeaderActions from './components/HeaderActions';
import YeuCauDangTinModal from './components/YeuCauDangTinModal';
import styles from './Header.module.css';

export default function Header({ onOpenLogin = null, onOpenRegister = null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    user,
    isLoggedIn,
    isSellerStatusLoading,
    isSellerStatusError,
    refetchSellerStatus,
    menuItems,
  } = useHeader();

  const yeuCauMutation = useYeuCauDangTin();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isYeuCauModalOpen, setIsYeuCauModalOpen] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  const showToast = useCallback((message, type = 'error') => {
    setToast({ isOpen: true, message, type });
  }, []);

  const showDangTin = !location.pathname.includes('/dang-tin');

  const handleLogin = useCallback(
    () => (onOpenLogin ? onOpenLogin() : navigate('/dang-nhap')),
    [onOpenLogin, navigate],
  );

  const handleRegister = useCallback(
    () => (onOpenRegister ? onOpenRegister() : navigate('/dang-ky')),
    [onOpenRegister, navigate],
  );

  const handleDangTinClick = useCallback(() => {
    if (!isLoggedIn) return handleLogin();
    if (isSellerStatusLoading) {
      return showToast('Đang kiểm tra quyền đăng tin, vui lòng đợi trong giây lát...');
    }
    if (isSellerStatusError || user?.laKhBan === undefined) {
      if (refetchSellerStatus) refetchSellerStatus();
      return showToast('Không thể xác nhận quyền đăng tin lúc này. Đang thử lại...');
    }
    if (user.laKhBan === false) return setIsYeuCauModalOpen(true);
    return navigate('/dang-tin');
  }, [
    isLoggedIn,
    handleLogin,
    isSellerStatusLoading,
    isSellerStatusError,
    user,
    navigate,
    refetchSellerStatus,
    showToast,
  ]);

  const handleConfirmYeuCau = useCallback(() => {
    yeuCauMutation.mutate(undefined, {
      onSuccess: (res) => {
        setIsYeuCauModalOpen(false);
        showToast(
          res?.message || 'Đã gửi yêu cầu đăng tin bán, vui lòng chờ Admin duyệt',
          'success',
        );
      },
      onError: (err) => {
        setIsYeuCauModalOpen(false);
        showToast(err?.response?.data?.message || 'Không thể gửi yêu cầu đăng tin bán lúc này');
      },
    });
  }, [yeuCauMutation, showToast]);

  const handleLogout = useCallback(async () => {
    await logoutApi().catch(() => undefined);
    removeToken();
    queryClient.clear();
    setIsAccountMenuOpen(false);
    navigate('/');
  }, [navigate, queryClient]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <HeaderLogo />
          <HeaderNav items={menuItems} />
        </div>

        <HeaderActions
          isLoggedIn={isLoggedIn}
          user={user}
          coThongBao={isLoggedIn}
          showDangTin={showDangTin}
          isSellerStatusLoading={isSellerStatusLoading}
          onOpenLogin={handleLogin}
          onOpenRegister={handleRegister}
          onLogout={handleLogout}
          onDangTinClick={handleDangTinClick}
          isAccountMenuOpen={isAccountMenuOpen}
          onToggleAccountMenu={() => setIsAccountMenuOpen((prev) => !prev)}
          onCloseAccountMenu={() => setIsAccountMenuOpen(false)}
        />
      </div>

      <YeuCauDangTinModal
        isOpen={isYeuCauModalOpen}
        isLoading={yeuCauMutation.isPending}
        onClose={() => setIsYeuCauModalOpen(false)}
        onConfirm={handleConfirmYeuCau}
      />

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </header>
  );
}

Header.propTypes = {
  onOpenLogin: PropTypes.func,
  onOpenRegister: PropTypes.func,
};

Header.defaultProps = {
  onOpenLogin: null,
  onOpenRegister: null,
};
