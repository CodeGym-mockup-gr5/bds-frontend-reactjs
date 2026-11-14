import Modal from '../../../components/Modal';
import LoginForm from './LoginForm';

export default function LoginModal({ isOpen, onClose, onSuccess, onSwitchToRegister = null }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Đăng nhập" maxWidth="520px">
      <LoginForm
        onSuccess={onSuccess}
        onCancel={onClose}
        onNavigateAway={onClose}
        onSwitchToRegister={onSwitchToRegister}
        inModal
      />
    </Modal>
  );
}
