import { formatArea } from '../../../utils/format';
import { EMPTY_TEXT, LOAI_BDS_LABELS, VI_TRI_LABELS } from '../constants/nhuCauOptions';

function toLabel(labels, value) {
  if (!value) return EMPTY_TEXT;
  return labels[value] || value;
}

export function formatLoaiBds(value) {
  return toLabel(LOAI_BDS_LABELS, value);
}

export function formatViTri(value) {
  return toLabel(VI_TRI_LABELS, value);
}

export function formatDienTichRange(min, max) {
  const minText = formatArea(min);
  const maxText = formatArea(max);
  if (!minText && !maxText) return EMPTY_TEXT;
  if (!minText || !maxText) return minText || maxText;
  if (Number(min) === Number(max)) return minText;
  return `${minText.replace(/\s*m²$/, '')} – ${maxText}`;
}

export function formatGhiChu(value) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text || EMPTY_TEXT;
}
