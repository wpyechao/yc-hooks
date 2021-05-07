import { useRef, useEffect, useState } from 'react';
import usePersistFn from '../usePersistFn';

interface IOption {
  manual?: boolean;
}

function useInterval(
  callback: () => void,
  delay: number,
  options?: IOption,
): {
  counting: boolean;
  cancel: () => void;
  start: () => void;
} {
  const _options = (options || {}) as IOption;
  const [counting, setCounting] = useState(!_options.manual);

  const id = useRef<any>(0);

  // 持久化回调
  const savedCallback = usePersistFn(callback);

  const start = usePersistFn(() => {
    if (id.current === 0) {
      setCounting(true);
      id.current = setInterval(savedCallback, delay);
    }
  });

  const cancel = usePersistFn(() => {
    clearTimeout(id.current);
    setCounting(false);
    id.current = 0;
  });

  useEffect(() => {
    if (!_options.manual) {
      start();
    }
    return () => {
      cancel();
    };
  }, [_options.manual, cancel, start]);

  return {
    counting,
    start,
    cancel,
  };
}

export default useInterval;
