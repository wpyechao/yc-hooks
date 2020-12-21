import { useRef, useCallback, useEffect } from 'react';

type Fn = (...args: any[]) => any;

// 用于持久化函数
function usePersistFn<T extends Fn>(fn: T | undefined): T {
  const ref = useRef<T | undefined>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  const persistedFn = useCallback((...args: any[]) => ref.current?.(...args), []) as T

  return persistedFn;
}

export default usePersistFn;
