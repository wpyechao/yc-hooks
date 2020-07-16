import { IMethod, useMethod } from '..';

const numberMethods: IMethod<number> = {
  increment: s => s + 1,
  decrement: s => s - 1,
  add: (s, a: number) => s + a,
  subtract: (s, a: number) => s - a,
  multiply: (s, a: number) => s * a,
  divide: (s, a: number) => s / a,
  set: (s, n: number) => n,
};

export function useNumber(initialValue: number = 0) {
  return useMethod(initialValue, numberMethods);
}
