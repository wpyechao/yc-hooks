export type Func<T> = (...args: any[]) => Promise<T | undefined>;

// 返回值
export type Result = {
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

// 过滤属性
export type Filters = {
  [key: string]: string | number | undefined;
} | null;

// useTable 选项
export type Options = {
  defaultFilters?: Filters | undefined;
  form?: any;
};
