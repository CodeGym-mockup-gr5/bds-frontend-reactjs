const VIETNAMESE_NAME_REGEX = /^[\p{L} ]+$/u;
const VIETNAMESE_PHONE_REGEX = /^0\d{9}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateField(name, value) {
  const strValue = typeof value === 'string' ? value.trim() : value;

  switch (name) {
    case 'hoTen':
      if (!strValue) {
        return 'Xin mời nhập đầy đủ thông tin';
      }
      if (strValue.length > 45) {
        return 'Họ tên tối đa 45 ký tự';
      }
      if (!VIETNAMESE_NAME_REGEX.test(strValue)) {
        return 'Tên nhân viên không được chứa ký tự đặc biệt';
      }
      return '';

    case 'ngaySinh': {
      if (!strValue) {
        return 'Xin mời nhập đầy đủ thông tin';
      }
      const birthDate = new Date(strValue);
      if (Number.isNaN(birthDate.getTime())) {
        return 'Ngày sinh không hợp lệ';
      }
      const today = new Date();
      if (birthDate > today) {
        return 'Ngày sinh không được ở tương lai';
      }
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
      }
      if (age < 18) {
        return 'Nhân viên chưa đủ tuổi lao động (tối thiểu 18 tuổi)';
      }
      return '';
    }

    case 'gioiTinh':
      if (!strValue) {
        return 'Xin mời nhập đầy đủ thông tin';
      }
      return '';

    case 'diaChi':
      if (!strValue) {
        return 'Xin mời nhập đầy đủ thông tin';
      }
      if (strValue.length > 255) {
        return 'Địa chỉ tối đa 255 ký tự';
      }
      return '';

    case 'soDienThoai': {
      const strippedPhone = typeof value === 'string' ? value.replace(/\s+/g, '') : '';
      if (!strippedPhone) {
        return 'Xin mời nhập đầy đủ thông tin';
      }
      if (!VIETNAMESE_PHONE_REGEX.test(strippedPhone)) {
        return 'Số điện thoại không hợp lệ';
      }
      return '';
    }

    case 'email':
      if (!strValue) {
        return 'Xin mời nhập đầy đủ thông tin';
      }
      if (strValue.length > 254) {
        return 'Email tối đa 254 ký tự';
      }
      if (!EMAIL_REGEX.test(strValue)) {
        return 'Email không hợp lệ!';
      }
      return '';

    case 'chucVu':
      if (!strValue) {
        return 'Xin mời nhập đầy đủ thông tin';
      }
      return '';

    case 'laAdmin':
      if (value === null || value === undefined || value === '') {
        return 'Xin mời nhập đầy đủ thông tin';
      }
      return '';

    default:
      return '';
  }
}

export function validateAll(formData) {
  const errors = {};
  const fields = [
    'hoTen',
    'ngaySinh',
    'gioiTinh',
    'diaChi',
    'soDienThoai',
    'email',
    'chucVu',
    'laAdmin',
  ];

  fields.forEach((field) => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}
