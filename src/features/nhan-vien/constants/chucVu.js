export const CHUC_VU_LABELS = {
  TRUONG_PHONG: 'Trưởng phòng Môi giới',
  KE_TOAN: 'Kế toán',
  NHAN_VIEN: 'Nhân viên Môi giới',
};

export function formatChucVu(chucVu, laAdmin = false) {
  if (laAdmin) return 'Quản trị viên';
  if (!chucVu) return '';
  return CHUC_VU_LABELS[chucVu] || chucVu;
}
