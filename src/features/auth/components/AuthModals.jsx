import Toast from '../../../components/Toast';
import useAuth from '../../../hooks/useAuth';
import LoginModal from './LoginModal';
import LogoutConfirmModal from './LogoutConfirmModal';

export default function AuthModals() {
  const {
    isLoginModalOpen,
    closeLoginModal,
    handleLoginSuccess,
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
