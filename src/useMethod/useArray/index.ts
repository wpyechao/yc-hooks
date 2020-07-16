import { useMemo } from 'react';
import { IMethod, useMethod } from '..';

export function useArray<T>(initialValue: T[] = []) {
  const arrayMethods = useMemo<IMethod<T[]>>(() => {
    return {
      push: (s, i: T) => s.concat(i),
      pop: s => s.slice(0, -1),
      shift: s => s.slice(1),
      unshift: (s, i: T) => (Array.isArray(i) ? i.concat(s) : [i].concat(s)),
      slice: (s, start: number, end: number) => s.slice(start, end),
      empty: () => [],
      set: (s, n: T[]) => n,
      remove: (s, condition: (i: T, ii: number) => boolean) =>
        s.filter((i: T, ii: number) => !condition(i, ii)),
    };
  }, []);

  return useMethod<T[]>(initialValue, arrayMethods);
}
