import { useLayoutEffect, useRef } from 'react';

const DIGIT_PATTERN = /\d/;

function countDigits(text) {
  return Array.from(text).filter((char) => DIGIT_PATTERN.test(char)).length;
}

function findCaretPosition(text, digitCount) {
  if (digitCount <= 0) return 0;
  let seen = 0;
  const index = Array.from(text).findIndex((char) => {
    if (DIGIT_PATTERN.test(char)) seen += 1;
    return seen === digitCount;
  });
  return index === -1 ? text.length : index + 1;
}

export default function useDigitCaret() {
  const inputRef = useRef(null);
  const pendingRef = useRef(null);

  useLayoutEffect(() => {
    const input = inputRef.current;
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (!input || !pending || input.value === pending.rawValue) return;
    if (input.ownerDocument.activeElement !== input) return;
    const position = findCaretPosition(input.value, pending.digitCount);
    input.setSelectionRange(position, position);
  });

  const captureCaret = () => {
    const input = inputRef.current;
    if (!input) return;
    const caret = input.selectionStart ?? input.value.length;
    pendingRef.current = {
      rawValue: input.value,
      digitCount: countDigits(input.value.slice(0, caret)),
    };
  };

  return { inputRef, captureCaret };
}
