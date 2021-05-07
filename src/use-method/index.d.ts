export declare type IMethod<T> = {
    [key: string]: (v: T, ...args: any[]) => T;
};
export declare type Return = {
    [key: string]: (...args: any[]) => void;
};
export declare function useMethod<T, TResult = Return>(initialValue: T, methods: IMethod<T>): [T, TResult];
