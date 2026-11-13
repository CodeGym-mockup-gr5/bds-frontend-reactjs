import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
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

export default function Header({ onOpenLogin, onOpenRegister }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    headerData,
    user,
    isLoggedIn,
    isSellerStatusLoading,
    isSellerStatusError,
    refetchSellerStatus,
  } = useHeader();

  const yeuCauMutation = useYeuCauDangTin();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isYeuCauModalOpen, setIsYeuCauModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  const mobileMenuRef = useRef(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCloseToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const isDangTinPage =
    location.pathname === '/dang-tin' || location.pathname === '/bat-dong-san/dang-tin';
  const showDangTin = !isDangTinPage && (headerData?.coNutDangTin ?? true);

  const handleLogin = useCallback(() => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      navigate('/dang-nhap');
    }
  }, [onOpenLogin, navigate]);

  const handleRegister = useCallback(() => {
    if (onOpenRegister) {
      onOpenRegister();
    } else {
      navigate('/dang-ky');
    }
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
      if (refetchSellerStatus) {
        refetchSellerStatus();
      }
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
        const errorMsg =
          err?.response?.data?.message || 'Không thể gửi yêu cầu đăng tin bán lúc này';
        setToast({
          isOpen: true,
          message: errorMsg,
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

  const handleToggleAccountMenu = useCallback(() => {
    setIsAccountMenuOpen((prev) => !prev);
  }, []);

  const handleCloseAccountMenu = useCallback(() => {
    setIsAccountMenuOpen(false);
  }, []);

  const handleCloseYeuCauModal = useCallback(() => {
    setIsYeuCauModalOpen(false);
  }, []);

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={handleToggleMobileMenu}
            aria-label="Mở menu điều hướng"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          <HeaderLogo />
          <HeaderNav items={headerData?.danhSachMenu} />
        </div>

        <HeaderActions
          isLoggedIn={isLoggedIn}
          user={user}
          coThongBao={headerData?.coThongBao}
          showDangTin={showDangTin}
          isSellerStatusLoading={isSellerStatusLoading}
          onOpenLogin={handleLogin}
          onOpenRegister={handleRegister}
          onLogout={handleLogout}
          onDangTinClick={handleDangTinClick}
          isAccountMenuOpen={isAccountMenuOpen}
          onToggleAccountMenu={handleToggleAccountMenu}
          onCloseAccountMenu={handleCloseAccountMenu}
        />
      </div>

      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className={styles.mobileMenuDrawer}>
          <ul className={styles.mobileNavList}>
            {(headerData?.danhSachMenu || []).map((item) => (
              <li key={item.duongDan} className={styles.mobileNavItem}>
                <NavLink
                  to={item.duongDan}
                  onClick={handleCloseMobileMenu}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}`
                      : styles.mobileNavLink
                  }
                >
                  {item.nhan}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <YeuCauDangTinModal
        isOpen={isYeuCauModalOpen}
        isLoading={yeuCauMutation.isPending}
        onClose={handleCloseYeuCauModal}
        onConfirm={handleConfirmYeuCau}
      />

      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={handleCloseToast}
      />
    </header>
  );
}
