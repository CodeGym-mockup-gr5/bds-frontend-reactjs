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

export const MAX_IMAGE_COUNT = 10;
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const DIA_CHI_MAX_LENGTH = 255;
export const PHAP_LY_MAX_LENGTH = 255;
export const GHI_CHU_MAX_LENGTH = 50;
export const GIA_MAX_DIGITS = 15;

export function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label || '';
}
