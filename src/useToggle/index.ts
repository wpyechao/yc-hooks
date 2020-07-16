import { useCallback, useState, useMemo } from 'react';

type IState = string | number | boolean | undefined;

function useToggle<T extends IState = IState>(
  defaultValue: T,
): {
  state: T;
  toggle: (value?: T) => void;
  setLeft: () => void;
  setRight: () => void;
};

function useToggle<D extends IState = IState, R extends IState = IState>(
  defaultValue: D = false as D,
  reverseValue?: R,
): {
  state: D | R;
  toggle: (value?: D | R) => void;
  setLeft: () => void;
  setRight: () => void;
} {
  const [state, setState] = useState<D | R>(defaultValue);

  const reverseValueOrigin = useMemo(
    () => (reverseValue === undefined ? !defaultValue : reverseValue) as D | R,
    [reverseValue],
  );

  // 切换返回值
  const toggle = useCallback(
    (value?: D | R) => {
      // 强制返回状态值
      if (value !== undefined) {
        setState(value);
        return;
      }
      const data = state === defaultValue ? reverseValueOrigin : defaultValue;
      setState(data);
    },
    [state],
  );

  // 设置默认值
  const setLeft = useCallback(() => {
    setState(defaultValue);
  }, [setState]);

  // 设置取反值
  const setRight = useCallback(() => {
    setState(reverseValueOrigin);
  }, [setState]);

  return {
    state,
    toggle,
    setLeft,
    setRight,
  };
}

export default useToggle;
