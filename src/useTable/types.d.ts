export declare type Func<T> = (...args: any[]) => Promise<T | undefined>;
export declare type TableSetting = {
    total: number;
    onPaginationChange: (pageNum: number, pageSize: number) => void;
    current: number;
    size: number;
};
export declare type Result = {
    refresh: (checkDec: boolean) => void;
    searchBy: (filter: any) => void;
    exportExcel: Func<any>;
    excelLoading: boolean;
    params: object | null;
    setDataSource: (data: []) => void;
    submit: (e: any) => void;
    reset: () => void;
    tableProps: {
        loading: boolean;
        dataSource: any;
        pagination: any;
        onChange: (...args: any) => void;
        setting: TableSetting;
    };
};
export declare type Filters = {
    [key: string]: string | number | undefined;
} | null;
export declare type Options = {
    defaultFilters?: Filters | undefined;
    form?: any;
};
