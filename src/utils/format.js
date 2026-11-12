const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const PHONE_PATTERN = /^(\d{4})(\d{3})(\d{3})$/;
const MAX_AREA_FRACTION_DIGITS = 2;

function isEmpty(value) {
  return value === null || value === undefined || (typeof value === 'string' && !value.trim());
}

function toNumber(value) {
  if (isEmpty(value) || typeof value === 'boolean') {
    return null;
  }
  const number = typeof value === 'number' ? value : Number(String(value).trim());
  return Number.isFinite(number) ? number : null;
}

function groupThousands(digits) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatInteger(number) {
  const rounded = Math.round(number);
  const sign = rounded < 0 ? '-' : '';
  return `${sign}${groupThousands(String(Math.abs(rounded)))}`;
}

function formatDecimal(number, maxFractionDigits) {
  const [integerPart, fractionPart = ''] = Math.abs(number).toFixed(maxFractionDigits).split('.');
  const trimmedFraction = fractionPart.replace(/0+$/, '');
  const isZero = !Number(integerPart) && !trimmedFraction;
  const sign = number < 0 && !isZero ? '-' : '';
  const grouped = groupThousands(integerPart);
  return trimmedFraction ? `${sign}${grouped},${trimmedFraction}` : `${sign}${grouped}`;
}

function pad(number) {
  return String(number).padStart(2, '0');
}

function toDate(value) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }
  const text = value.trim();
  const match = ISO_DATE_PATTERN.exec(text);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);
    const isValid =
      date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    return isValid ? date : null;
  }
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatCurrency(value) {
  const number = toNumber(value);
  return number === null ? '' : `${formatInteger(number)} đ`;
}

export function formatPricePerM2(value) {
  const number = toNumber(value);
  return number === null ? '' : `${formatInteger(number)} đ/m²`;
}

export function formatArea(value) {
  const number = toNumber(value);
  return number === null ? '' : `${formatDecimal(number, MAX_AREA_FRACTION_DIGITS)} m²`;
}

export function formatDate(value) {
  const date = toDate(value);
  if (!date) {
    return '';
  }
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function formatDateTime(value) {
  const date = toDate(value);
  if (!date) {
    return '';
  }
  return `${pad(date.getHours())}:${pad(date.getMinutes())} ${formatDate(date)}`;
}

export function formatPhone(value) {
  if (isEmpty(value)) {
    return '';
  }
  const text = String(value);
  const match = PHONE_PATTERN.exec(text);
  return match ? `${match[1]} ${match[2]} ${match[3]}` : text;
}
