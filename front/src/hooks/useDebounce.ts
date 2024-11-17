import { useCallback, useEffect, useMemo, useState } from 'react';

function useDebounce<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  const updateDebounceValue = useCallback(() => {
    setDebounceValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(updateDebounceValue, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, updateDebounceValue]);

  return useMemo(() => debounceValue, [debounceValue]);
}

export default useDebounce;
