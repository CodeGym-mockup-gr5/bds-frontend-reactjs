export const NHU_CAU_QUERY_KEY = 'nhuCauCuaToi';

export const NHU_CAU_PAGE_SIZE = 10;

export const LOAI_BDS_LABELS = {
  DAT: 'Đất',
  NHA_O: 'Nhà ở',
};

export const VI_TRI_LABELS = {
  TRUNG_TAM: 'Trung tâm',
  NGOAI_O: 'Ngoại ô',
};

const ALL_OPTION = { value: '', label: 'Tất cả' };

function toOptions(labels) {
  return [ALL_OPTION, ...Object.entries(labels).map(([value, label]) => ({ value, label }))];
}

export const LOAI_BDS_FILTER_OPTIONS = toOptions(LOAI_BDS_LABELS);

export const VI_TRI_FILTER_OPTIONS = toOptions(VI_TRI_LABELS);

export const EMPTY_TEXT = 'Không có';
