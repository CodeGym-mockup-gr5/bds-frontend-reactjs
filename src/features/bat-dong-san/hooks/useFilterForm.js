import { useState } from 'react';
import { RANGE_ERROR_MESSAGE } from '../constants/batDongSanList';
import { GIA_MAX_DIGITS } from '../constants/batDongSanOptions';
import { EMPTY_FILTERS } from './useBatDongSanFilters';

const DIEN_TICH_FIELDS = ['dienTichTu', 'dienTichDen'];
const DIEN_TICH_MAX_DIGITS = 9;
const MAX_DECIMALS = 2;

function isDienTich(name) {
  return DIEN_TICH_FIELDS.includes(name);
}

function groupThousands(digits) {
  return digits.replace(/^0+(?=\d)/, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function sanitizeGia(value) {
  return groupThousands(value.replace(/\D/g, '').slice(0, GIA_MAX_DIGITS));
}

function sanitizeDienTich(value) {
  const [integerPart, ...fractionParts] = value.replace(/[^\d.,]/g, '').split(/[.,]/);
  const integerText = integerPart.replace(/^0+(?=\d)/, '').slice(0, DIEN_TICH_MAX_DIGITS);
  if (!fractionParts.length) {
    return integerText;
  }
  return `${integerText},${fractionParts.join('').slice(0, MAX_DECIMALS)}`;
}

function toInput(name, value) {
  if (!value) {
    return '';
  }
  if (isDienTich(name)) {
    return String(value).replace('.', ',');
  }
  return groupThousands(String(value).split('.')[0]);
}

function toParam(name, text) {
  if (!text) {
    return '';
  }
  if (isDienTich(name)) {
    const number = Number(text.replace(',', '.'));
    return Number.isFinite(number) ? String(number) : '';
  }
  return text.replace(/\./g, '');
}

function parseInput(name, text) {
  const param = toParam(name, text);
  return param ? Number(param) : null;
}

function getRangeError(fromName, toName, draft) {
  const min = parseInput(fromName, draft[fromName]);
  const max = parseInput(toName, draft[toName]);
  return min !== null && max !== null && min > max ? RANGE_ERROR_MESSAGE : '';
}

function toDraft(filters) {
  return {
    tuKhoa: filters.tuKhoa,
    loaiBds: filters.loaiBds,
    viTri: filters.viTri,
    huong: filters.huong,
    dienTichTu: toInput('dienTichTu', filters.dienTichTu),
    dienTichDen: toInput('dienTichDen', filters.dienTichDen),
    giaTu: toInput('giaTu', filters.giaTu),
    giaDen: toInput('giaDen', filters.giaDen),
  };
}

function keepUnsavedEdits(current, previousSeed, nextSeed) {
  return Object.fromEntries(
    Object.keys(nextSeed).map((name) => [
      name,
      current[name] === previousSeed[name] ? nextSeed[name] : current[name],
    ]),
  );
}

export default function useFilterForm({ filters, filterKey, onApply, onReset }) {
  const [seed, setSeed] = useState(() => ({ key: filterKey, draft: toDraft(filters) }));
  const [draft, setDraft] = useState(seed.draft);
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (seed.key !== filterKey) {
    const nextSeedDraft = toDraft(filters);
    setSeed({ key: filterKey, draft: nextSeedDraft });
    setDraft(keepUnsavedEdits(draft, seed.draft, nextSeedDraft));
    setIsSubmitted(false);
  }

  const rangeErrors = {
    dienTich: getRangeError('dienTichTu', 'dienTichDen', draft),
    gia: getRangeError('giaTu', 'giaDen', draft),
  };
  const hasRangeError = Boolean(rangeErrors.dienTich || rangeErrors.gia);

  const errors = {
    dienTich: isSubmitted || touched.dienTich ? rangeErrors.dienTich : '',
    gia: isSubmitted || touched.gia ? rangeErrors.gia : '',
  };

  const setField = (name, value) => setDraft((prev) => ({ ...prev, [name]: value }));

  const setNumberField = (name, value) =>
    setField(name, isDienTich(name) ? sanitizeDienTich(value) : sanitizeGia(value));

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
      dienTichTu: toParam('dienTichTu', draft.dienTichTu),
      dienTichDen: toParam('dienTichDen', draft.dienTichDen),
      giaTu: toParam('giaTu', draft.giaTu),
      giaDen: toParam('giaDen', draft.giaDen),
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
    collapse: () => setIsExpanded(false),
  };
}
