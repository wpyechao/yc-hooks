import { useState, useRef, useCallback, useEffect } from 'react';

type SetState<S> = (state: S, cb: (prev: S) => {}) => void;

type UpdateCb<S> = (newState: S) => void;

function useCbState<S>(initialState: () => S | S): [S, SetState<S>] {
  const [cbState, setState] = useState(initialState);

  const updatedCbRef = useRef<UpdateCb<S> | undefined>(void 0);

  const setCbState = useCallback((state, cb) => {
    setState(prev => {
      updatedCbRef.current = cb;
      return typeof state === 'function' ? state(prev) : state;
    });
  }, []);

  useEffect(() => {
    if (updatedCbRef.current) {
      updatedCbRef.current(cbState);
    }
  }, [cbState]);

  return [cbState, setCbState];
}

export default useCbState;
