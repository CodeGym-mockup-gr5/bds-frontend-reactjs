import { useRef } from 'react';
import { HomeIcon } from '../../../components/Icons';
import useCurrentUser from '../../../hooks/useCurrentUser';
import ActiveFilterChips from '../components/ActiveFilterChips';
import BatDongSanFilter from '../components/BatDongSanFilter';
import BatDongSanResults from '../components/BatDongSanResults';
import { ErrorBanner } from '../components/ListState';
import PageBreadcrumb from '../components/PageBreadcrumb';
import TinhTrangChips from '../components/TinhTrangChips';
import useBatDongSanFilters from '../hooks/useBatDongSanFilters';
import useBatDongSanList from '../hooks/useBatDongSanList';
import useFilterForm from '../hooks/useFilterForm';
import styles from './BatDongSanListPage.module.css';

const BREADCRUMB_ITEMS = [
  { label: 'Mua bất động sản', to: '/' },
  { label: 'Danh sách bất động sản' },
];

const BLOCKED_MESSAGE =
  'Vui lòng sửa khoảng diện tích hoặc giá tiền: giá trị tối thiểu không được vượt quá ' +
  'giá trị tối đa. Danh sách bên dưới vẫn là kết quả trước đó.';

export default function BatDongSanListPage() {
  const resultsRef = useRef(null);
  const { isNoiBo, isAdmin, isLoading: isUserLoading } = useCurrentUser();
  const filterState = useBatDongSanFilters({ isNoiBo, isAdmin });

  const list = useBatDongSanList({
    apiParams: filterState.apiParams,
    baseParams: filterState.baseParams,
    moiDang: filterState.moiDang,
    isNoiBo,
    enabled: !isUserLoading,
  });

  const form = useFilterForm({
    filters: filterState.filters,
    filterKey: filterState.filterKey,
    onApply: filterState.applyFilters,
    onReset: filterState.resetFilters,
  });

  const handlePageChange = (nextPage) => {
    filterState.goToPage(nextPage);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toolbar = isNoiBo && (
    <TinhTrangChips
      value={filterState.tinhTrang}
      counts={list.counts}
      moiDang={filterState.moiDang}
      showMoiDang={isAdmin}
      onSelect={filterState.selectTinhTrang}
      onMoiDang={filterState.selectMoiDang}
    />
  );

  return (
    <div className={styles.page}>
      <PageBreadcrumb items={BREADCRUMB_ITEMS} />

      <div className={styles.heading}>
        <div>
          <h1 className={styles.title}>Danh sách bất động sản</h1>
          <p className={styles.subtitle}>Tìm nhà ở và đất phù hợp với nhu cầu mua của bạn.</p>
        </div>
        <span className={styles.tag}>
          <HomeIcon size={14} />
          Mua / Bán
        </span>
      </div>

      <BatDongSanFilter form={form} />

      {!form.isExpanded && (
        <ActiveFilterChips
          filters={filterState.filters}
          onRemove={filterState.removeFilters}
          onClear={form.reset}
        />
      )}

      {form.isBlocked && <ErrorBanner title="Chưa áp dụng tìm kiếm" message={BLOCKED_MESSAGE} />}

      <div ref={resultsRef} className={styles.resultsAnchor}>
        <BatDongSanResults
          list={list}
          page={filterState.page}
          moiDang={filterState.moiDang}
          hasActiveFilters={filterState.hasActiveFilters}
          isBlocked={form.isBlocked}
          toolbar={toolbar}
          onPageChange={handlePageChange}
          onReset={form.reset}
        />
      </div>
    </div>
  );
}
