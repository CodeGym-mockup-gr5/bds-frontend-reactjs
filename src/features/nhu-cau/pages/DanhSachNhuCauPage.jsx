import { useId } from 'react';
import NhuCauCard from '../components/NhuCauCard';
import NhuCauFilterCard from '../components/NhuCauFilterCard';
import {
  NhuCauEmpty,
  NhuCauError,
  NhuCauLoading,
  NhuCauNoResult,
} from '../components/NhuCauListStates';
import NhuCauPagination from '../components/NhuCauPagination';
import useDanhSachNhuCau from '../hooks/useDanhSachNhuCau';
import styles from './DanhSachNhuCauPage.module.css';

function NhuCauResults({ danhSach, onChangePage }) {
  if (danhSach.isError) return <NhuCauError onRetry={() => danhSach.refetch()} />;
  if (danhSach.isPending || danhSach.isRecoveringPage) return <NhuCauLoading />;
  if (danhSach.totalElements === 0) {
    return danhSach.isFiltered ? (
      <NhuCauNoResult onClearFilter={danhSach.clearFilter} />
    ) : (
      <NhuCauEmpty />
    );
  }

  const isUpdating = danhSach.isFetching && danhSach.isPlaceholderData;

  return (
    <>
      <ul className={isUpdating ? `${styles.list} ${styles.listUpdating}` : styles.list}>
        {danhSach.items.map((nhuCau) => (
          <li key={nhuCau.id}>
            <NhuCauCard nhuCau={nhuCau} />
          </li>
        ))}
      </ul>
      <NhuCauPagination
        page={danhSach.page}
        totalPages={danhSach.totalPages}
        disabled={isUpdating}
        onChange={onChangePage}
      />
    </>
  );
}

export default function DanhSachNhuCauPage() {
  const danhSach = useDanhSachNhuCau();
  const titleId = useId();
  const isUpdating = danhSach.isFetching && danhSach.isPlaceholderData;
  const showCount =
    !danhSach.isPending && !danhSach.isError && (danhSach.totalElements > 0 || danhSach.isFiltered);

  const handleChangePage = (nextPage) => {
    danhSach.setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.page} aria-labelledby={titleId}>
      <header className={styles.header}>
        <h1 id={titleId} className={styles.title}>
          Danh sách nhu cầu
        </h1>
        <p className={styles.description}>Các nhu cầu bạn đã gửi cho trung tâm.</p>
      </header>

      <NhuCauFilterCard
        filter={danhSach.draftFilter}
        dienTichError={danhSach.dienTichError}
        onChange={danhSach.changeDraft}
        onSubmit={danhSach.applyFilter}
      />

      <div className={styles.results} aria-busy={danhSach.isFetching}>
        {showCount && (
          <p className={styles.count} role="status">
            {`Tìm thấy ${danhSach.totalElements} nhu cầu`}
            {isUpdating && (
              <span className={styles.updating}>
                <span className={styles.spinner} aria-hidden="true" />
                Đang tải...
              </span>
            )}
          </p>
        )}
        <NhuCauResults danhSach={danhSach} onChangePage={handleChangePage} />
      </div>
    </section>
  );
}
