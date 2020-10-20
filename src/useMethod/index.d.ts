export declare type IMethod<T> = {
    [key: string]: (v: T, ...args: any[]) => T;
};
export declare type Return<T> = {
    [key: string]: (...args: any[]) => T;
};
export declare function useMethod<T>(initialValue: T, methods: IMethod<T>): [T, Return<T>];
