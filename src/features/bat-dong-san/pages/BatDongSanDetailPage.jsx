import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, PinIcon } from '../../../components/Icons';
import StatusBadge from '../../../components/StatusBadge';
import { formatArea, formatCurrency, formatPricePerM2 } from '../../../utils/format';
import BatDongSanDetailSkeleton from '../components/BatDongSanDetailSkeleton';
import ChuSoHuuCard from '../components/ChuSoHuuCard';
import ImageGallery from '../components/ImageGallery';
import { EmptyState, ErrorBanner } from '../components/ListState';
import PageBreadcrumb from '../components/PageBreadcrumb';
import ThongTinChiTiet from '../components/ThongTinChiTiet';
import { LOAI_BDS_OPTIONS, getOptionLabel } from '../constants/batDongSanOptions';
import useBatDongSanDetail from '../hooks/useBatDongSanDetail';
import styles from './BatDongSanDetailPage.module.css';

const LIST_PATH = '/bat-dong-san';
const BASE_BREADCRUMB = [
  { label: 'Mua bất động sản', to: '/' },
  { label: 'Danh sách bất động sản', to: LIST_PATH },
];

function SummaryCard({ batDongSan, onBack }) {
  const loaiLabel = getOptionLabel(LOAI_BDS_OPTIONS, batDongSan.loaiBds);
  const meta = [batDongSan.maBds, loaiLabel].filter(Boolean).join(' · ');
  const specs = [formatPricePerM2(batDongSan.giaM2), formatArea(batDongSan.dienTich)];

  return (
    <section className={styles.card} aria-label="Tóm tắt bất động sản">
      <div className={styles.summaryTop}>
        <StatusBadge tinhTrang={batDongSan.tinhTrang} className={styles.badge} />
        <span className={styles.meta}>{meta}</span>
      </div>
      <div>
        <p className={styles.price}>{formatCurrency(batDongSan.gia)}</p>
        <p className={styles.specs}>{specs.filter(Boolean).join(' · ')}</p>
      </div>
      {batDongSan.diaChi && (
        <p className={styles.address}>
          <PinIcon size={16} className={styles.pin} />
          <span>{batDongSan.diaChi}</span>
        </p>
      )}
      <button type="button" className={styles.backButton} onClick={onBack}>
        <ArrowLeftIcon size={16} />
        Quay lại danh sách
      </button>
    </section>
  );
}

function DetailContent({ detail, onBack }) {
  if (detail.isNotFound) {
    return (
      <EmptyState
        title="Không tìm thấy bất động sản"
        description="Bất động sản không tồn tại hoặc không còn được hiển thị."
        actionLabel="Về danh sách"
        onAction={onBack}
      />
    );
  }

  if (detail.isLoading) {
    return <BatDongSanDetailSkeleton />;
  }

  const { batDongSan } = detail;
  if (!batDongSan) {
    return (
      <ErrorBanner
        title="Không tải được thông tin bất động sản"
        message="Đã có lỗi kết nối hoặc máy chủ. Vui lòng thử lại."
        actionLabel="Thử lại"
        onAction={() => detail.refetch()}
      />
    );
  }

  const loaiLabel = getOptionLabel(LOAI_BDS_OPTIONS, batDongSan.loaiBds);

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <ImageGallery hinhAnh={batDongSan.hinhAnh} alt={`${loaiLabel} ${batDongSan.diaChi}`} />
        <ThongTinChiTiet batDongSan={batDongSan} />
      </div>
      <aside className={styles.side}>
        <SummaryCard batDongSan={batDongSan} onBack={onBack} />
        <ChuSoHuuCard chuSoHuu={batDongSan.chuSoHuu} />
      </aside>
    </div>
  );
}

export default function BatDongSanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const detail = useBatDongSanDetail(id);
  const breadcrumb = [
    ...BASE_BREADCRUMB,
    { label: detail.batDongSan?.maBds || 'Chi tiết bất động sản' },
  ];

  return (
    <div className={styles.page}>
      <PageBreadcrumb items={breadcrumb} fallbackPath={LIST_PATH} />
      <h1 className={styles.title}>Chi tiết bất động sản</h1>
      <DetailContent detail={detail} onBack={() => navigate(LIST_PATH)} />
    </div>
  );
}
