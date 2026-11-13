export const PAGE_SIZE = 9;
export const SKELETON_COUNT = 9;
export const TU_KHOA_MAX_LENGTH = 100;

export const LOAI_BDS_OPTIONS = [
  { value: 'DAT', label: 'Đất' },
  { value: 'NHA_O', label: 'Nhà ở' },
];

export const VI_TRI_OPTIONS = [
  { value: 'TRUNG_TAM', label: 'Trung tâm' },
  { value: 'NGOAI_O', label: 'Ngoại ô' },
];

export const HUONG_OPTIONS = [
  { value: 'DONG', label: 'Đông' },
  { value: 'TAY', label: 'Tây' },
  { value: 'NAM', label: 'Nam' },
  { value: 'BAC', label: 'Bắc' },
  { value: 'DONG_BAC', label: 'Đông Bắc' },
  { value: 'DONG_NAM', label: 'Đông Nam' },
  { value: 'TAY_BAC', label: 'Tây Bắc' },
  { value: 'TAY_NAM', label: 'Tây Nam' },
];

export const TINH_TRANG_OPTIONS = [
  { value: 'CO_SAN', label: 'Có sẵn' },
  { value: 'DA_BAN', label: 'Đã bán' },
];

export const RANGE_ERROR_MESSAGE = 'Giá trị tối thiểu không được vượt quá giá trị tối đa.';
export const EMPTY_MESSAGE = 'Không tìm thấy thông tin.';

export function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label || '';
}
