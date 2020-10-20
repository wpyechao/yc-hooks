declare type SetState<S> = (state: S, cb: (prev: S) => {}) => void;
declare function useCbState<S>(initialState: () => S | S): [S, SetState<S>];
export default useCbState;
