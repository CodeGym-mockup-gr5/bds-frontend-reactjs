import { formatDate, formatPhone } from '../../../utils/format';
import { CHUC_VU_LABEL_MAP, GIOI_TINH_LABEL_MAP } from '../constants/nhanVienConstants';
import { PencilIcon, TrashIcon } from './NhanVienIcons';
import styles from './NhanVienTable.module.css';

export default function NhanVienTable({ items, onDelete, onEdit }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Mã nhân viên</th>
            <th className={styles.th}>Họ tên</th>
            <th className={styles.th}>Ngày sinh</th>
            <th className={styles.th}>Giới tính</th>
            <th className={styles.th}>Số điện thoại</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Chức vụ</th>
            <th className={styles.th}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map((nv) => {
            const chucVuText = CHUC_VU_LABEL_MAP[nv.chucVu] || nv.chucVu || '';
            const gioiTinhText = GIOI_TINH_LABEL_MAP[nv.gioiTinh] || nv.gioiTinh || '';
            const formattedDate = formatDate(nv.ngaySinh) || nv.ngaySinh || '';
            const formattedPhone = formatPhone(nv.soDienThoai) || nv.soDienThoai || '';

            return (
              <tr key={nv.id} className={styles.tr}>
                <td className={`${styles.td} ${styles.codeCell}`}>{nv.maNv}</td>
                <td className={`${styles.td} ${styles.nameCell}`}>{nv.hoTen}</td>
                <td className={styles.td}>{formattedDate}</td>
                <td className={styles.td}>{gioiTinhText}</td>
                <td className={styles.td}>{formattedPhone}</td>
                <td className={styles.td}>{nv.email}</td>
                <td className={styles.td}>
                  <span className={styles.badge}>{chucVuText}</span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => onDelete?.(nv)}
                      aria-label={`Xóa nhân viên ${nv.hoTen}`}
                    >
                      <TrashIcon size={14} />
                      <span>Xóa</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => onEdit?.(nv)}
                      aria-label={`Sửa nhân viên ${nv.hoTen}`}
                    >
                      <PencilIcon size={14} />
                      <span>Sửa</span>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
