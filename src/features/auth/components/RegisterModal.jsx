import Modal from '../../../components/Modal';
import RegisterForm from './RegisterForm';

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Đăng ký tài khoản" maxWidth="660px">
      <RegisterForm onCancel={onClose} onSwitchToLogin={onSwitchToLogin} />
    </Modal>
  );
}
