import { LockedCodeField } from '../../nhan-vien/components/ProfileExtraFields';
import ProfileTextField from '../../nhan-vien/components/ProfileTextField';
import styles from '../../nhan-vien/components/SuaThongTinCaNhanForm.module.css';

function formatLoaiKhachHang(profile) {
  const roles = [];
  if (profile?.laKhMua) roles.push('Khách mua');
  if (profile?.laKhBan) roles.push('Khách bán');
  return roles.length > 0 ? roles.join(' & ') : 'Khách hàng';
}

function formatTrangThaiDangTin(profile) {
  if (profile?.trangThaiDuyet === 'CHO_DUYET') return 'Chờ duyệt';
  if (profile?.laKhBan) return 'Đã duyệt';
  return 'Chưa đăng ký bán';
}

export default function KhachHangProfileFields({
  profile,
  soCccdValue,
  soCccdError,
  disabled,
  onChange,
  onBlur,
}) {
  return (
    <>
      <ProfileTextField
        label="Số CCCD"
        name="soCccd"
        placeholder="Nhập 12 chữ số CCCD (không bắt buộc)"
        value={soCccdValue}
        disabled={disabled}
        error={soCccdError}
        onChange={onChange}
        onBlur={onBlur}
      />

      <div className={styles.twoColGrid}>
        <LockedCodeField
          label="Vai trò khách hàng"
          value={formatLoaiKhachHang(profile)}
          hint="Vai trò được hệ thống ghi nhận"
        />
        <LockedCodeField
          label="Trạng thái duyệt đăng tin"
          value={formatTrangThaiDangTin(profile)}
          hint="Do Quản trị viên phê duyệt"
        />
      </div>
    </>
  );
}
