import { IMethod, useMethod } from '..';

const boolMethods: IMethod<boolean> = {
  setTrue: () => true,
  setFalse: () => false,
  toggle: (s, n: any) => (n === undefined ? !s : !!n),
};

export function useBool(initialValue?: boolean) {
  const iv = (typeof initialValue === 'undefined'
    ? false
    : initialValue) as boolean;
  return useMethod(iv, boolMethods);
}
