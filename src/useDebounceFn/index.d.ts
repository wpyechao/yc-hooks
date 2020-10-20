declare type Fn = (...args: any[]) => any;
declare function useDebounceFn(fn: Fn, interval: number): (...args: any[]) => any;
export default useDebounceFn;
