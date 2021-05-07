import { useRef, useEffect } from 'react';
import usePersistFn from '../use-persist-fn';

type Fn = (...args: any[]) => void;

function useDebounceFn<T extends Fn>(fn: T, interval: number) {
  // 持久化传入的回调
  const fnPersisted = usePersistFn<T>(fn);

  // 定时器
  const timer = useRef<any>(null);

  // 清除上次的执行
  const cancel = usePersistFn(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
  });

  // 防抖的函数
  const debounceFn = usePersistFn(((...args) => {
    cancel();
    // 设定新的定时器
    timer.current = setTimeout(() => {
      fnPersisted(...args);
    }, interval);
  }) as T)

  // 卸载时清除
  useEffect(() => {
    return () => cancel();
  }, []);

  return debounceFn;
}

export default useDebounceFn;
