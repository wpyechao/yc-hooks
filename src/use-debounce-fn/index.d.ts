declare type Fn = (...args: any[]) => void;
declare function useDebounceFn<T extends Fn>(fn: T, interval: number): T;
export default useDebounceFn;
