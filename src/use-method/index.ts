import { useState, useMemo } from 'react';

export type IMethod<T> = {
  [key: string]: (v: T, ...args: any[]) => T;
};

export type Return = {
  [key: string]: (...args: any[]) => void;
};

export function useMethod<T, TResult = Return>(
  initialValue: T,
  methods: IMethod<T>,
): [T, TResult] {
  const [value, setValue] = useState(initialValue);

  const boundMethods = useMemo<TResult>(
    () =>
      Object.entries(methods).reduce((m, [name, fn]) => {
        const method = (...args: any[]): void => {
          setValue(v => fn(v, ...args));
        };
        return {
          ...m,
          [name]: method,
        };
      }, {} as TResult),
    [methods],
  );

  return [value, boundMethods];
}
