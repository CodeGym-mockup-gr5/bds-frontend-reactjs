import { useState } from 'react';
import { RANGE_ERROR_MESSAGE } from '../constants';
import { EMPTY_FILTERS } from './useBatDongSanFilters';

export const MILLION = 1000000;

function sanitizeNumber(value) {
  const [integerPart, ...fractionParts] = value.replace(/[^\d.,]/g, '').split(/[.,]/);
  return fractionParts.length ? `${integerPart},${fractionParts.join('')}` : integerPart;
}

function toInput(value, divisor = 1) {
  if (!value) {
    return '';
  }
  return String(Number(value) / divisor).replace('.', ',');
}

function parseInput(text) {
  if (!text) {
    return null;
  }
  const number = Number(text.replace(',', '.'));
  return Number.isFinite(number) ? number : null;
}

function toParam(text, multiplier = 1) {
  const number = parseInput(text);
  if (number === null) {
    return '';
  }
  return String(multiplier === 1 ? number : Math.round(number * multiplier));
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
    giaTu: toInput(filters.giaTu, MILLION),
    giaDen: toInput(filters.giaDen, MILLION),
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

  const setNumberField = (name, value) => setField(name, sanitizeNumber(value));

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
      giaTu: toParam(draft.giaTu, MILLION),
      giaDen: toParam(draft.giaDen, MILLION),
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
