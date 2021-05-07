export declare type Func<T> = (...args: any[]) => Promise<T | undefined>;
export declare type Result = {
    refresh: (checkDec: boolean) => void;
    searchBy: (filter: any) => void;
    params: object | null;
    setDataSource: (data: []) => void;
    submit: (e: any) => void;
    reset: () => void;
    tableProps: {
        loading: boolean;
        dataSource: any;
        pagination: any;
        onChange: (...args: any) => void;
    };
};
export declare type Filters = {
    [key: string]: string | number | undefined;
} | null;
export declare type Options = {
    defaultFilters?: Filters | undefined;
    form?: any;
};
