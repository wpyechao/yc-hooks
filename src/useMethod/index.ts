import { useState, useMemo } from 'react';

export type IMethod<T> = {
  [key: string]: (v: T, ...args: any[]) => T;
};

export type Return<T> = {
  [key: string]: (...args: any[]) => T;
};

export function useMethod<T>(
  initialValue: T,
  methods: IMethod<T>,
): [T, Return<T>] {
  const [value, setValue] = useState(initialValue);

  const boundMethods = useMemo(
    () =>
      Object.entries(methods).reduce((m, [name, fn]) => {
        const method = (...args: any[]): void => {
          setValue(v => fn(v, ...args));
        };
        return {
          ...m,
          [name]: method,
        };
      }, {}),
    [methods],
  );
  return [value, boundMethods];
}
