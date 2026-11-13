import { validateField } from './dangTinValidation';

export const DANG_TIN_SECTIONS = [
  { key: 'hinhAnh', title: 'Hình ảnh', required: ['hinhAnh'], optional: [] },
  { key: 'thongTinCoBan', title: 'Thông tin cơ bản', required: ['loaiBds'], optional: ['phapLy'] },
  { key: 'viTri', title: 'Vị trí', required: ['diaChi', 'viTri', 'huong'], optional: [] },
  {
    key: 'dacDiemVaGia',
    title: 'Đặc điểm và giá',
    required: ['dienTich', 'gia'],
    optional: ['ghiChu'],
  },
];

const REQUIRED_LABELS = {
  hinhAnh: 'Hình ảnh',
  loaiBds: 'Loại BĐS',
  diaChi: 'Địa chỉ',
  viTri: 'Vị trí',
  huong: 'Hướng',
  dienTich: 'Diện tích',
  gia: 'Giá',
};

export function getDangTinCompletion(values, images) {
  const isComplete = (field) =>
    field === 'hinhAnh'
      ? images.some((image) => image.status === 'done')
      : !validateField(field, values);
  const hasInput = (field) =>
    field === 'hinhAnh' ? images.length > 0 : String(values[field] ?? '').trim() !== '';

  const sections = DANG_TIN_SECTIONS.map((section) => {
    const missing = section.required.filter((field) => !isComplete(field)).length;
    const touched = [...section.required, ...section.optional].some(hasInput);
    let state = 'empty';
    if (missing === 0) {
      state = 'done';
    } else if (touched) {
      state = 'progress';
    }
    return { ...section, missing, state };
  });

  const requiredFields = DANG_TIN_SECTIONS.flatMap((section) => section.required);
  const missingFields = requiredFields.filter((field) => !isComplete(field));
  const percent = Math.round(
    ((requiredFields.length - missingFields.length) / requiredFields.length) * 100,
  );

  return {
    sections,
    percent,
    missingLabels: missingFields.map((field) => REQUIRED_LABELS[field]),
  };
}
