import Toast from '../../../components/Toast';
import useAuth from '../../../hooks/useAuth';
import LoginModal from './LoginModal';
import LogoutConfirmModal from './LogoutConfirmModal';
import RegisterModal from './RegisterModal';

export default function AuthModals() {
  const {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    handleLoginSuccess,
    isRegisterModalOpen,
    openRegisterModal,
    closeRegisterModal,
    isLogoutModalOpen,
    logoutMutation,
    closeLogoutModal,
    confirmLogout,
    toast,
    closeToast,
  } = useAuth();

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={handleLoginSuccess}
        onSwitchToRegister={openRegisterModal}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onSwitchToLogin={() => openLoginModal()}
      />

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        isLoading={logoutMutation.isPending}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />

      <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={closeToast} />
    </>
  );
}
