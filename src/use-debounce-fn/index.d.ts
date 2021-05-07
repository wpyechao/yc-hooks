declare type Fn = (...args: any[]) => any;
declare function useDebounceFn(fn: Fn, interval: number): () => void;
export default useDebounceFn;
