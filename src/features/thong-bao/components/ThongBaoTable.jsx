import { useEffect, useRef } from 'react';
import Icon from '../../../components/Icon';
import { formatDate } from '../../../utils/format';
import styles from './ThongBaoTable.module.css';

function SelectAllCheckbox({ checkedCount, total, disabled, onChange }) {
  const ref = useRef(null);
  const isAll = total > 0 && checkedCount === total;

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = checkedCount > 0 && !isAll;
  }, [checkedCount, isAll]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={styles.checkbox}
      checked={isAll}
      disabled={disabled}
      onChange={onChange}
      aria-label="Chọn tất cả thông báo trong trang"
    />
  );
}

export default function ThongBaoTable({
  items,
  selectedIds,
  isUpdating = false,
  footer = null,
  onToggleOne,
  onToggleAll,
  onEdit = undefined,
  onDelete = undefined,
}) {
  const checkedCount = items.filter((item) => selectedIds.includes(item.id)).length;

  return (
    <div className={styles.card} aria-busy={isUpdating}>
      <div className={styles.scroller}>
        <table className={`${styles.table} ${isUpdating ? styles.tableUpdating : ''}`}>
          <thead>
            <tr>
              <th scope="col" className={styles.colCheck}>
                <SelectAllCheckbox
                  checkedCount={checkedCount}
                  total={items.length}
                  disabled={isUpdating}
                  onChange={onToggleAll}
                />
              </th>
              <th scope="col" className={styles.colDate}>
                Ngày
              </th>
              <th scope="col" className={styles.colTitle}>
                Tên thông báo
              </th>
              <th scope="col">Nội dung thông báo</th>
              <th scope="col" className={styles.colActions}>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <tr key={item.id} className={isSelected ? styles.rowSelected : undefined}>
                  <td className={styles.colCheck}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={isSelected}
                      disabled={isUpdating}
                      onChange={() => onToggleOne(item.id)}
                      aria-label={`Chọn thông báo ${item.tenThongBao}`}
                    />
                  </td>
                  <td className={styles.colDate}>{formatDate(item.ngay)}</td>
                  <td className={`${styles.colTitle} ${styles.titleCell}`}>{item.tenThongBao}</td>
                  <td className={styles.contentCell}>
                    <span className={styles.clamp}>{item.noiDung}</span>
                  </td>
                  <td className={styles.colActions}>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.actionButton}
                        onClick={() => onEdit(item)}
                        disabled={!onEdit}
                        aria-label={`Sửa thông báo ${item.tenThongBao}`}
                      >
                        <Icon name="pencil" />
                        Sửa
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionButton} ${styles.actionDanger}`}
                        onClick={() => onDelete(item)}
                        disabled={!onDelete}
                        aria-label={`Xóa thông báo ${item.tenThongBao}`}
                      >
                        <Icon name="trash" />
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {footer}
    </div>
  );
}
