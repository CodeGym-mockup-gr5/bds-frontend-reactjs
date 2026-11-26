import { useCallback, useRef } from 'react';

export default function useScrollToTop() {
  const ref = useRef(null);

  const scrollToTop = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return { ref, scrollToTop };
}
