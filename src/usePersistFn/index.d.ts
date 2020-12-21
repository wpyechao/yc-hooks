declare type Fn = (...args: any[]) => any;
declare function usePersistFn<T extends Fn>(fn: T | undefined): T;
export default usePersistFn;
