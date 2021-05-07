import { IMethod, useMethod } from '..';

const boolMethods: IMethod<boolean> = {
  setTrue: () => true,
  setFalse: () => false,
  toggle: (s) => !s,
};

export type TRes = {
  setTrue: () => void,
  setFalse: () => void,
  toggle: () => void
}

export function useBool(initialValue?: boolean) {
  const iv = (typeof initialValue === 'undefined' ? false : initialValue) as boolean;

  return useMethod<boolean, TRes>(iv, boolMethods);
}
