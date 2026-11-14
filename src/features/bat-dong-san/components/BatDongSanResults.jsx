import Pagination from '../../../components/Pagination';
import { PAGE_SIZE, SKELETON_COUNT } from '../constants/batDongSanList';
import BatDongSanCard from './BatDongSanCard';
import BatDongSanCardSkeleton from './BatDongSanCardSkeleton';
import { EmptyState, ErrorBanner } from './ListState';
import styles from './BatDongSanResults.module.css';

const SKELETON_KEYS = Array.from({ length: SKELETON_COUNT }, (_, index) => `skeleton-${index}`);
const EMPTY_HINT =
  'Hãy mở rộng khoảng giá hoặc diện tích để có thêm kết quả. ' +
  'Bạn cũng có thể xóa bộ lọc để xem lại toàn bộ danh sách bất động sản.';

function getTitle({ total, isLoading, hasNoData, isBlocked, moiDang, hasActiveFilters }) {
  if (isLoading) return 'Đang tải bất động sản...';
  if (hasNoData) return 'Chưa tải được kết quả';
  if (isBlocked) return `Kết quả trước đó · ${total} bất động sản`;
  if (moiDang) return `Mới đăng: ${total} bất động sản`;
  if (hasActiveFilters) return `Tìm thấy ${total} bất động sản`;
  return `Kết quả: ${total} bất động sản`;
}

function getSubtitle({ total, counts, hasActiveFilters, moiDang }) {
  if (moiDang) return 'Sắp xếp theo ngày đăng mới nhất';
  if (hasActiveFilters && total === 0) return 'Không có kết quả theo bộ lọc đã chọn';
  const prefix = hasActiveFilters ? 'Theo bộ lọc đã chọn' : 'Danh sách chưa lọc';
  if (counts.CO_SAN === undefined || counts.DA_BAN === undefined) return prefix;
  return `${prefix} · ${counts.CO_SAN} có sẵn · ${counts.DA_BAN} đã bán`;
}

function ResultsBody({ list, hasActiveFilters, onReset }) {
  if (list.isLoading) {
    return (
      <div className={styles.grid} aria-busy="true">
        {SKELETON_KEYS.map((key) => (
          <BatDongSanCardSkeleton key={key} />
        ))}
      </div>
    );
  }

  const errorBanner = list.isError && (
    <ErrorBanner
      title="Không tải được danh sách bất động sản"
      message="Đã có lỗi kết nối hoặc máy chủ. Bộ lọc của bạn vẫn được giữ nguyên."
      actionLabel="Thử lại"
      onAction={() => list.refetch()}
    />
  );

  if (!list.items.length) {
    return (
      errorBanner || (
        <EmptyState
          description={hasActiveFilters ? EMPTY_HINT : ''}
          actionLabel={hasActiveFilters ? 'Xóa bộ lọc' : ''}
          onAction={onReset}
        />
      )
    );
  }

  return (
    <>
      {errorBanner}
      <div
        className={`${styles.grid} ${list.isPlaceholderData ? styles.stale : ''}`}
        aria-busy={list.isFetching}
      >
        {list.items.map((item) => (
          <BatDongSanCard key={item.id} batDongSan={item} />
        ))}
      </div>
    </>
  );
}

export default function BatDongSanResults({
  list,
  page,
  moiDang,
  hasActiveFilters,
  isBlocked,
  toolbar,
  onPageChange,
  onReset,
}) {
  const total = list.totalElements;
  const from = total ? (page - 1) * PAGE_SIZE + 1 : 0;
  const to = Math.min(page * PAGE_SIZE, total);
  const hasNoData = list.isError && !list.items.length;
  const summary = {
    total,
    isLoading: list.isLoading,
    hasNoData,
    isBlocked,
    moiDang,
    hasActiveFilters,
  };

  return (
    <section className={styles.results} aria-labelledby="ket-qua-bds">
      <div className={styles.header}>
        <div>
          <h2 id="ket-qua-bds" className={styles.title}>
            {getTitle(summary)}
          </h2>
          {!list.isLoading && !hasNoData && (
            <p className={styles.subtitle}>{getSubtitle({ ...summary, counts: list.counts })}</p>
          )}
        </div>
        {toolbar}
      </div>

      <ResultsBody list={list} hasActiveFilters={hasActiveFilters} onReset={onReset} />

      {!list.isLoading && total > 0 && (
        <div className={styles.footer}>
          <p className={styles.range}>
            Hiển thị {from}–{to} trên {total} bất động sản
          </p>
          <Pagination
            page={page}
            totalPages={list.totalPages}
            onChange={onPageChange}
            disabled={list.isFetching}
          />
        </div>
      )}
    </section>
  );
}
