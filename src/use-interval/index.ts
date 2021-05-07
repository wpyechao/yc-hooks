import { useRef, useEffect, useState } from 'react';
import usePersistFn from '../use-persist-fn';

interface IOption {
  manual?: boolean;
}

interface Return<T> {
  counting: boolean
  start: T
  cancel: () => void
}

type Fn = (...args: any[]) => any

function useInterval<T extends Fn>(
  callback: T,
  delay: number,
  options?: IOption,
): Return<T> {
  const _options = (options || {}) as IOption

  const [counting, setCounting] = useState(!_options.manual)

  const id = useRef<any>(0);

  const start = usePersistFn(((...args) => {
    if (id.current === 0) {
      setCounting(true)
      id.current = setInterval(() => callback(...args), delay);
    }
  }) as T)

  const cancel = usePersistFn(() => {
    clearTimeout(id.current);
    setCounting(false);
    id.current = 0;
  });

  useEffect(() => {
    if (!_options.manual) {
      start()
    }
    return () => {
      cancel()
    }
  }, [])

  return {
    counting,
    start,
    cancel,
  }
}

export default useInterval;
