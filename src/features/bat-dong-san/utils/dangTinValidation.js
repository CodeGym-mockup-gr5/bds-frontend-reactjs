import { formatNumber } from '../../../utils/format';
import {
  DIA_CHI_MAX_LENGTH,
  GHI_CHU_MAX_LENGTH,
  GIA_MAX_DIGITS,
  MAX_IMAGE_COUNT,
  PHAP_LY_MAX_LENGTH,
} from '../constants/batDongSanOptions';

const DIGITS_PATTERN = /^\d+$/;
const AREA_PATTERN = /^\d{1,8}([.,]\d{1,2})?$/;
const MIN_AREA = 0.01;

export const INITIAL_VALUES = {
  loaiBds: '',
  phapLy: '',
  diaChi: '',
  viTri: '',
  huong: '',
  dienTich: '',
  gia: '',
  ghiChu: '',
};

export const FORM_FIELDS = Object.keys(INITIAL_VALUES);

export const IMAGE_MESSAGES = {
  count: 'Số lượng hình ảnh phải từ 1 đến 10 ảnh',
  uploading: 'Vui lòng chờ ảnh tải lên xong',
  failed: 'Vui lòng thử lại hoặc xóa ảnh tải lên lỗi',
};

function trimmed(value) {
  return String(value ?? '').trim();
}

export function parseArea(value) {
  const text = trimmed(value);
  return AREA_PATTERN.test(text) ? Number(text.replace(',', '.')) : null;
}

function isPriceTooLong(text) {
  return text.length > GIA_MAX_DIGITS;
}

export function parsePrice(value) {
  const text = trimmed(value);
  return DIGITS_PATTERN.test(text) && !isPriceTooLong(text) ? Number(text) : null;
}

export function normalizePriceInput(rawValue) {
  const compact = String(rawValue ?? '').replace(/[.\s]/g, '');
  return /^\d*$/.test(compact) ? compact : rawValue;
}

export function formatPriceInput(value) {
  return DIGITS_PATTERN.test(value) && !isPriceTooLong(value) ? formatNumber(value) : value;
}

export function computePricePerM2(values) {
  const area = parseArea(values.dienTich);
  const price = parsePrice(values.gia);
  if (price === null || !area || area < MIN_AREA) {
    return null;
  }
  return price / area;
}

const FIELD_VALIDATORS = {
  loaiBds: (text) => (text ? '' : 'Xin mời chọn loại bất động sản'),
  phapLy: (text) => (text.length > PHAP_LY_MAX_LENGTH ? 'Thông tin pháp lý tối đa 255 ký tự' : ''),
  diaChi: (text) => {
    if (!text) return 'Xin mời nhập địa chỉ';
    return text.length > DIA_CHI_MAX_LENGTH ? 'Địa chỉ tối đa 255 ký tự' : '';
  },
  viTri: (text) => (text ? '' : 'Xin mời chọn vị trí'),
  huong: (text) => (text ? '' : 'Xin mời chọn hướng'),
  dienTich: (text) => {
    if (!text) return 'Vui lòng nhập diện tích';
    const area = parseArea(text);
    if (area === null) return 'Diện tích không hợp lệ';
    return area < MIN_AREA ? 'Diện tích phải lớn hơn hoặc bằng 0.01 m2' : '';
  },
  gia: (text) => {
    if (!text) return 'Vui lòng nhập giá';
    if (!DIGITS_PATTERN.test(text)) return 'Giá tiền chỉ bao gồm các chữ số';
    return isPriceTooLong(text) ? 'Giá tiền phải là số nguyên' : '';
  },
  ghiChu: (text) => (text.length > GHI_CHU_MAX_LENGTH ? 'Ghi chú tối đa 50 ký tự' : ''),
};

export function validateField(name, values) {
  const validator = FIELD_VALIDATORS[name];
  return validator ? validator(trimmed(values[name])) : '';
}

export function validateValues(values) {
  return FORM_FIELDS.reduce((errors, field) => {
    const message = validateField(field, values);
    return message ? { ...errors, [field]: message } : errors;
  }, {});
}

export function validateImages(images) {
  if (images.some((image) => image.status === 'uploading')) return IMAGE_MESSAGES.uploading;
  if (images.some((image) => image.status === 'error')) return IMAGE_MESSAGES.failed;
  const doneCount = images.filter((image) => image.status === 'done').length;
  return doneCount < 1 || doneCount > MAX_IMAGE_COUNT ? IMAGE_MESSAGES.count : '';
}

function toNullableText(value) {
  const text = trimmed(value);
  return text || null;
}

export function buildPayload(values, images) {
  return {
    loaiBds: values.loaiBds,
    diaChi: trimmed(values.diaChi),
    viTri: values.viTri,
    huong: values.huong,
    dienTich: parseArea(values.dienTich),
    gia: parsePrice(values.gia),
    phapLy: toNullableText(values.phapLy),
    ghiChu: toNullableText(values.ghiChu),
    danhSachHinhAnh: images
      .filter((image) => image.status === 'done')
      .map((image, index) => ({ duongDan: image.url, thuTu: index + 1 })),
  };
}
