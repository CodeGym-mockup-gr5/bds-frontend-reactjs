import { useState } from 'react';
import { RANGE_ERROR_MESSAGE } from '../constants';
import { EMPTY_FILTERS } from './useBatDongSanFilters';

const DECIMAL_FIELDS = ['dienTichTu', 'dienTichDen'];
const MAX_DECIMALS = 2;

function groupThousands(digits) {
  return digits.replace(/^0+(?=\d)/, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function sanitizeNumber(value, allowDecimal) {
  const [integerPart, ...fractionParts] = value.replace(/[^\d,]/g, '').split(',');
  const integerText = groupThousands(integerPart);
  if (!allowDecimal || !fractionParts.length) {
    return integerText;
  }
  return `${integerText},${fractionParts.join('').slice(0, MAX_DECIMALS)}`;
}

function toInput(value) {
  if (!value) {
    return '';
  }
  const [integerPart, fractionPart] = String(Number(value)).split('.');
  const integerText = groupThousands(integerPart);
  return fractionPart ? `${integerText},${fractionPart}` : integerText;
}

function parseInput(text) {
  if (!text) {
    return null;
  }
  const number = Number(text.replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(number) ? number : null;
}

function toParam(text) {
  const number = parseInput(text);
  return number === null ? '' : String(number);
}

function getRangeError(from, to) {
  const min = parseInput(from);
  const max = parseInput(to);
  return min !== null && max !== null && min > max ? RANGE_ERROR_MESSAGE : '';
}

function toDraft(filters) {
  return {
    tuKhoa: filters.tuKhoa,
    loaiBds: filters.loaiBds,
    viTri: filters.viTri,
    huong: filters.huong,
    dienTichTu: toInput(filters.dienTichTu),
    dienTichDen: toInput(filters.dienTichDen),
    giaTu: toInput(filters.giaTu),
    giaDen: toInput(filters.giaDen),
  };
}

export default function useFilterForm({ filters, filterKey, onApply, onReset }) {
  const [seedKey, setSeedKey] = useState(filterKey);
  const [draft, setDraft] = useState(() => toDraft(filters));
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (seedKey !== filterKey) {
    setSeedKey(filterKey);
    setDraft(toDraft(filters));
    setTouched({});
    setIsSubmitted(false);
  }

  const rangeErrors = {
    dienTich: getRangeError(draft.dienTichTu, draft.dienTichDen),
    gia: getRangeError(draft.giaTu, draft.giaDen),
  };
  const hasRangeError = Boolean(rangeErrors.dienTich || rangeErrors.gia);

  const errors = {
    dienTich: isSubmitted || touched.dienTich ? rangeErrors.dienTich : '',
    gia: isSubmitted || touched.gia ? rangeErrors.gia : '',
  };

  const setField = (name, value) => setDraft((prev) => ({ ...prev, [name]: value }));

  const setNumberField = (name, value) =>
    setField(name, sanitizeNumber(value, DECIMAL_FIELDS.includes(name)));

  const touchRange = (range) => setTouched((prev) => ({ ...prev, [range]: true }));

  const submit = () => {
    setIsSubmitted(true);
    if (hasRangeError) {
      setIsExpanded(true);
      return;
    }
    onApply({
      tuKhoa: draft.tuKhoa.trim(),
      loaiBds: draft.loaiBds,
      viTri: draft.viTri,
      huong: draft.huong,
      dienTichTu: toParam(draft.dienTichTu),
      dienTichDen: toParam(draft.dienTichDen),
      giaTu: toParam(draft.giaTu),
      giaDen: toParam(draft.giaDen),
    });
    setIsExpanded(false);
  };

  const reset = () => {
    setDraft(toDraft(EMPTY_FILTERS));
    setTouched({});
    setIsSubmitted(false);
    onReset();
  };

  return {
    draft,
    errors,
    isBlocked: isSubmitted && hasRangeError,
    isExpanded,
    setField,
    setNumberField,
    touchRange,
    submit,
    reset,
    toggleExpanded: () => setIsExpanded((prev) => !prev),
    expand: () => setIsExpanded(true),
  };
}
