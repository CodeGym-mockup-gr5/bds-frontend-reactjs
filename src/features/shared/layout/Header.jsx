import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useHeader from '../../../hooks/useHeader';
import useYeuCauDangTin from '../../../hooks/useYeuCauDangTin';
import Toast from '../../../components/Toast';
import HeaderLogo from './components/HeaderLogo';
import HeaderNav from './components/HeaderNav';
import HeaderActions from './components/HeaderActions';
import YeuCauDangTinModal from './components/YeuCauDangTinModal';
import styles from './Header.module.css';

export default function Header({ onOpenLogin = null, onOpenRegister = null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { openLoginModal, openLogoutModal, isKhachHang } = useAuth();

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

  const showDangTin = !location.pathname.includes('/dang-tin') && (!isLoggedIn || isKhachHang);

  const handleLogin = useCallback(
    () => (onOpenLogin ? onOpenLogin() : openLoginModal()),
    [onOpenLogin, openLoginModal],
  );

  const handleRegister = useCallback(
    () => (onOpenRegister ? onOpenRegister() : navigate('/dang-ky')),
    [onOpenRegister, navigate],
  );

  const handleDangTinClick = useCallback(() => {
    if (!isLoggedIn) return handleLogin();
    if (isSellerStatusLoading) return undefined;
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

  const handleLogout = useCallback(() => {
    setIsAccountMenuOpen(false);
    openLogoutModal();
  }, [openLogoutModal]);

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
          coThongBao={false}
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
