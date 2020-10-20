declare type Fn = (...args: any[]) => any;
declare function usePersistFn(fn: (...args: any[]) => any): Fn;
export default usePersistFn;
