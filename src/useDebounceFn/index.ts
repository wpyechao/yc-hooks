import { useRef, useEffect } from 'react';
import usePersistFn from '../usePersistFn';

type Fn = (...args: any[]) => any;

function useDebounceFn(fn: Fn, interval: number) {
  // 持久化传入的回调
  const fnPersisted = usePersistFn(fn);

  // 定时器
  const timer = useRef<any>(null);

  // 清除上次的执行
  const cancel = usePersistFn(() => {
    if (timer.current) clearTimeout(timer.current);
  });

  // 防抖的函数
  const debounceFn = usePersistFn(() => {
    cancel();
    // 设定新的定时器
    timer.current = setTimeout(() => {
      fnPersisted();
    }, interval);
  });

  // 卸载时清除
  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return debounceFn;
}

export default useDebounceFn;
