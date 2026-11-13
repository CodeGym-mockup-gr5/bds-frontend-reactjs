import { Link } from 'react-router-dom';
import YeuCauDangTinModal from '../../shared/layout/components/YeuCauDangTinModal';
import BasicInfoFields from '../components/BasicInfoFields';
import CompletionCard from '../components/CompletionCard';
import FormActions from '../components/FormActions';
import FormSection from '../components/FormSection';
import ImageUploadSection from '../components/ImageUploadSection';
import LocationFields from '../components/LocationFields';
import NguoiDangCard from '../components/NguoiDangCard';
import PreviewCard from '../components/PreviewCard';
import PriceFields from '../components/PriceFields';
import QuyenDangTinNotice from '../components/QuyenDangTinNotice';
import useDangTinForm from '../hooks/useDangTinForm';
import useImageUpload from '../hooks/useImageUpload';
import useQuyenDangTin from '../hooks/useQuyenDangTin';
import { getDangTinCompletion } from '../utils/dangTinCompletion';
import styles from './DangTinPage.module.css';

export default function DangTinPage() {
  const quyenDangTin = useQuyenDangTin();
  const imageUpload = useImageUpload();
  const form = useDangTinForm({
    images: imageUpload.images,
    canSubmit: quyenDangTin.canDangTin,
    onForbidden: quyenDangTin.refetchQuyen,
  });
  const isLocked = !quyenDangTin.canDangTin;
  const completion = getDangTinCompletion(form.values, imageUpload.images);
  const [imageSection, basicSection, locationSection, priceSection] = completion.sections;

  return (
    <div className={styles.page}>
      <nav aria-label="Breadcrumb">
        <ol className={styles.breadcrumb}>
          <li className={styles.breadcrumbItem}>
            <Link to="/" className={styles.breadcrumbLink}>
              Trang chủ
            </Link>
          </li>
          <li
            className={`${styles.breadcrumbItem} ${styles.breadcrumbCurrent}`}
            aria-current="page"
          >
            Đăng tin
          </li>
        </ol>
      </nav>

      <h1 className={styles.title}>Đăng tin bất động sản</h1>

      <div className={styles.layout}>
        <form ref={form.formRef} className={styles.form} onSubmit={form.handleSubmit} noValidate>
          <QuyenDangTinNotice
            quyen={quyenDangTin.quyen}
            onOpenYeuCau={quyenDangTin.openYeuCauModal}
            onRetry={() => quyenDangTin.refetchQuyen()}
          />
          <fieldset className={styles.formFieldset} disabled={isLocked}>
            <FormSection number={1} title={imageSection.title} status={imageSection}>
              <ImageUploadSection
                images={imageUpload.images}
                rejectedFiles={imageUpload.rejectedFiles}
                addFiles={imageUpload.addFiles}
                removeImage={imageUpload.removeImage}
                retryImage={imageUpload.retryImage}
                moveImage={imageUpload.moveImage}
                moveImageTo={imageUpload.moveImageTo}
                error={form.imageError}
                disabled={isLocked}
              />
            </FormSection>
            <FormSection number={2} title={basicSection.title} status={basicSection}>
              <BasicInfoFields
                values={form.values}
                errors={form.errors}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </FormSection>
            <FormSection number={3} title={locationSection.title} status={locationSection}>
              <LocationFields
                values={form.values}
                errors={form.errors}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </FormSection>
            <FormSection number={4} title={priceSection.title} status={priceSection}>
              <PriceFields
                values={form.values}
                errors={form.errors}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </FormSection>
          </fieldset>
          <FormActions
            isSubmitting={form.isSubmitting}
            isSubmitDisabled={isLocked}
            onCancel={form.handleCancel}
          />
        </form>

        <aside className={styles.sidebar} aria-label="Thông tin tin đăng">
          <NguoiDangCard nguoiDang={quyenDangTin.user} />
          <PreviewCard values={form.values} images={imageUpload.images} />
          <CompletionCard percent={completion.percent} missingLabels={completion.missingLabels} />
        </aside>
      </div>

      <YeuCauDangTinModal
        isOpen={quyenDangTin.isYeuCauModalOpen}
        isLoading={quyenDangTin.isYeuCauPending}
        onClose={quyenDangTin.closeYeuCauModal}
        onConfirm={quyenDangTin.confirmYeuCau}
      />
    </div>
  );
}
