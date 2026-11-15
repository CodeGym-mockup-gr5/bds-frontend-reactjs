import { useId } from 'react';
import Icon from '../../../components/Icon';
import Modal from '../../../components/Modal';
import useThongBaoForm from '../hooks/useThongBaoForm';
import FormField from './FormField';
import styles from './ThongBaoFormModal.module.css';

function ThongBaoFormBody({ formId, form, disabled }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    form.submit();
  };

  return (
    <form id={formId} className={styles.form} onSubmit={handleSubmit} noValidate>
      <FormField label="Ngày" name="ngay" type="date" form={form} disabled={disabled} />
      <FormField
        label="Tên thông báo"
        name="tenThongBao"
        placeholder="VD: Thông báo lịch họp giao ban tháng 11"
        maxLength={255}
        form={form}
        disabled={disabled}
      />
      <FormField
        label="Nội dung thông báo"
        name="noiDung"
        placeholder="Nhập nội dung thông báo"
        multiline
        maxLength={5000}
        form={form}
        disabled={disabled}
      />
      <p className={styles.note}>* Thông tin bắt buộc</p>
    </form>
  );
}

export default function ThongBaoFormModal({
  isOpen,
  title,
  initialValues,
  mutation,
  buildMutationInput = undefined,
  onSuccess,
  onError,
  onClose,
}) {
  const formId = useId();
  const form = useThongBaoForm({
    initialValues,
    mutation,
    buildMutationInput,
    onSuccess,
    onError,
  });
  const isLoading = mutation.isPending;

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? undefined : onClose}
      title={title}
      maxWidth="560px"
      footer={
        <div className={styles.actions}>
          <button type="submit" form={formId} className={styles.primaryButton} disabled={isLoading}>
            <Icon name="check" />
            {isLoading ? 'Đang lưu...' : 'Xác nhận'}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={form.reset}
            disabled={isLoading}
          >
            <Icon name="reset" />
            Nhập lại
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={onClose}
            disabled={isLoading}
          >
            <Icon name="close" />
            Thoát
          </button>
        </div>
      }
    >
      <ThongBaoFormBody formId={formId} form={form} disabled={isLoading} />
    </Modal>
  );
}
