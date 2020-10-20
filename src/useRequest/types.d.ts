export declare type Request<T> = (...args: any[]) => Promise<T>;
export declare type FetchConfig<T> = {
    enhanceResponse?: (data: T) => any;
    onSuccess?: (data: T) => void;
    onError?: (err: Error) => void;
    pollingInterval?: number;
};
export declare type FetchResult<T> = {
    loading: boolean;
    data: T | undefined;
    setData: (data: any) => void;
    error: Error | undefined;
    params: any;
    start: (...args: any[]) => Promise<T | Error>;
    cancel: (...args: any[]) => void;
};
export declare type Options<T> = {
    manual?: boolean;
    enhanceResponse?: (data: T) => any;
    onSuccess?: (data: T) => void;
    onError?: (data: T) => void;
    pollingInterval?: number;
};
