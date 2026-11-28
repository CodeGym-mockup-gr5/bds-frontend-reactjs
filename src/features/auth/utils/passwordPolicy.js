export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;
export const PASSWORD_MAX_CONSECUTIVE_REPEAT = 4;
export const PASSWORD_MIN_CONTEXT_TOKEN_LENGTH = 4;

export const WEAK_PASSWORDS = new Set([
  'password1!',
  'password@1',
  'password@123',
  'password123!',
  'p@ssword1',
  'p@ssw0rd',
  'p@ssw0rd1',
  'p@ssw0rd!',
  'admin@123',
  'admin@1234',
  'admin123!',
  'admin123@',
  'qwerty@123',
  'qwerty123!',
  'qwerty1!',
  'abcd@1234',
  'abc@1234',
  'abc12345!',
  'welcome@1',
  'welcome@123',
  'welcome123!',
  '12345678a!',
  '12345678a@',
  'a1234567!',
  'a1234567@',
  'test@1234',
  'test1234!',
  'user@1234',
  'user1234!',
  'vietnam@123',
  'vietnam123!',
  'matkhau@1',
  'matkhau@123',
  'matkhau123!',
  'realia@123',
  'iloveyou1!',
  'changeme1!',
  'changeme@1',
  'letmein@1',
  'pass@1234',
]);

function isAsciiPrintable(code) {
  return code >= 0x21 && code <= 0x7e;
}

function isSpecialAscii(code) {
  return (
    isAsciiPrintable(code) &&
    !(code >= 97 && code <= 122) &&
    !(code >= 65 && code <= 90) &&
    !(code >= 48 && code <= 57)
  );
}

function containsSensitiveToken(lowerPassword, token) {
  if (!token || typeof token !== 'string') {
    return false;
  }
  const normalized = token.trim().toLowerCase();
  return (
    normalized.length >= PASSWORD_MIN_CONTEXT_TOKEN_LENGTH && lowerPassword.includes(normalized)
  );
}

function extractEmailLocalPart(email) {
  if (!email || typeof email !== 'string') {
    return null;
  }
  const atIndex = email.indexOf('@');
  return atIndex > 0 ? email.slice(0, atIndex) : null;
}

export function getPasswordChecklist(value = '') {
  const raw = typeof value === 'string' ? value : '';
  const chars = Array.from(raw);
  const codes = chars.map((ch) => ch.charCodeAt(0));

  return [
    {
      id: 'minLength',
      label: 'Ít nhất 8 ký tự',
      passed: raw.length >= PASSWORD_MIN_LENGTH && raw.length <= PASSWORD_MAX_LENGTH,
    },
    {
      id: 'special',
      label: 'Ít nhất 1 ký tự đặc biệt (! @ # $ ...)',
      passed: codes.some((code) => isSpecialAscii(code)),
    },
    {
      id: 'digit',
      label: 'Ít nhất 1 chữ số',
      passed: codes.some((code) => code >= 48 && code <= 57),
    },
    {
      id: 'upper',
      label: 'Ít nhất 1 chữ IN HOA',
      passed: codes.some((code) => code >= 65 && code <= 90),
    },
    {
      id: 'lower',
      label: 'Ít nhất 1 chữ thường',
      passed: codes.some((code) => code >= 97 && code <= 122),
    },
  ];
}

export function validateStrongPassword(value, context = {}) {
  const raw = typeof value === 'string' ? value : '';
  if (!raw.trim()) {
    return '';
  }

  if (raw.length < PASSWORD_MIN_LENGTH || raw.length > PASSWORD_MAX_LENGTH) {
    return 'Mật khẩu phải từ 8 đến 64 ký tự';
  }

  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;
  let hasSpecial = false;
  let repeatCount = 1;
  let hasMaxRepeat = false;

  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i];
    const code = raw.charCodeAt(i);
    if (/\s/.test(ch)) {
      return 'Mật khẩu không được chứa khoảng trắng';
    }
    if (!isAsciiPrintable(code)) {
      return 'Mật khẩu chỉ gồm chữ không dấu, số và ký tự đặc biệt cơ bản';
    }
    if (code >= 97 && code <= 122) {
      hasLower = true;
    } else if (code >= 65 && code <= 90) {
      hasUpper = true;
    } else if (code >= 48 && code <= 57) {
      hasDigit = true;
    } else {
      hasSpecial = true;
    }
    if (i > 0) {
      repeatCount = ch === raw[i - 1] ? repeatCount + 1 : 1;
      if (repeatCount >= PASSWORD_MAX_CONSECUTIVE_REPEAT) {
        hasMaxRepeat = true;
      }
    }
  }

  const missing = [];
  if (!hasLower) missing.push('chữ thường');
  if (!hasUpper) missing.push('chữ in hoa');
  if (!hasDigit) missing.push('chữ số');
  if (!hasSpecial) missing.push('ký tự đặc biệt');
  if (missing.length > 0) {
    return `Mật khẩu cần có ít nhất: ${missing.join(', ')}`;
  }

  if (hasMaxRepeat) {
    return 'Mật khẩu không được chứa 4 ký tự giống nhau liên tiếp';
  }

  const lowerPass = raw.toLowerCase();
  if (WEAK_PASSWORDS.has(lowerPass)) {
    return 'Mật khẩu quá phổ biến, vui lòng chọn mật khẩu mạnh hơn';
  }

  if (
    containsSensitiveToken(lowerPass, context.tenDangNhap) ||
    containsSensitiveToken(lowerPass, extractEmailLocalPart(context.email))
  ) {
    return 'Mật khẩu không được chứa tên đăng nhập hoặc email';
  }

  return '';
}
