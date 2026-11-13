import { useState, useEffect, useCallback } from 'react';
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
import HeaderMobileDrawer from './components/HeaderMobileDrawer';
import MobileMenuButton from './components/MobileMenuButton';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showDangTin =
    location.pathname !== '/dang-tin' && location.pathname !== '/bat-dong-san/dang-tin';

  const handleLogin = useCallback(() => {
    if (onOpenLogin) onOpenLogin();
    else navigate('/dang-nhap');
  }, [onOpenLogin, navigate]);

  const handleRegister = useCallback(() => {
    if (onOpenRegister) onOpenRegister();
    else navigate('/dang-ky');
  }, [onOpenRegister, navigate]);

  const handleDangTinClick = useCallback(() => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }
    if (isSellerStatusLoading) {
      setToast({
        isOpen: true,
        message: 'Đang kiểm tra quyền đăng tin, vui lòng đợi trong giây lát...',
        type: 'error',
      });
      return;
    }
    if (isSellerStatusError || user?.laKhBan === undefined) {
      setToast({
        isOpen: true,
        message: 'Không thể xác nhận quyền đăng tin lúc này. Đang thử lại...',
        type: 'error',
      });
      if (refetchSellerStatus) refetchSellerStatus();
      return;
    }
    if (user.laKhBan === false) {
      setIsYeuCauModalOpen(true);
      return;
    }
    navigate('/dang-tin');
  }, [
    isLoggedIn,
    handleLogin,
    isSellerStatusLoading,
    isSellerStatusError,
    user,
    navigate,
    refetchSellerStatus,
  ]);

  const handleConfirmYeuCau = useCallback(() => {
    yeuCauMutation.mutate(undefined, {
      onSuccess: (res) => {
        setIsYeuCauModalOpen(false);
        setToast({
          isOpen: true,
          message: res?.message || 'Đã gửi yêu cầu đăng tin bán, vui lòng chờ Admin duyệt',
          type: 'success',
        });
      },
      onError: (err) => {
        setIsYeuCauModalOpen(false);
        setToast({
          isOpen: true,
          message: err?.response?.data?.message || 'Không thể gửi yêu cầu đăng tin bán lúc này',
          type: 'error',
        });
      },
    });
  }, [yeuCauMutation]);

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
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen((prev) => !prev)}
          />
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

      <HeaderMobileDrawer
        isOpen={isMobileMenuOpen}
        items={menuItems}
        onClose={() => setIsMobileMenuOpen(false)}
      />

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
