import { useCallback, useRef, useState, useMemo } from 'react';
import FileSaver from 'file-saver';
import isEqual from 'lodash.isequal';
import { TableSetting, Result, Func, Options, Filters } from './types';
import { useBool } from '../useMethod/useBool';
import useRequest from '../useRequest';
import { usePersistFn } from '..';

export default function useTable<T>(
  getData: Func<any>,
  getExcel?: Func<any> | Options,
  options?: Options,
): Result {
  const _options =
    (typeof getExcel === 'function' ? options : getExcel) || ({} as Options);
  const _getExcel = (typeof getExcel === 'function'
    ? getExcel
    : Promise.resolve()) as Func<any>;

  const { defaultFilters = {} as Filters, form = {} as any } = _options;

  // 获取excel的方法
  const getExcelPersisted = usePersistFn(_getExcel);

  const [fetchingExcel, { toggle: toggleFetchingExcel }] = useBool(false);

  const [flushFlag, { toggle: toggleFlushFlag }] = useBool(); // 强制刷新的变量
  const [current, setCurrent] = useState<number>(1); // pageNo
  const [size, setSize] = useState(10); // pageSize

  const [outerFilters, setOutFilters] = useState<Filters>(defaultFilters); // 外部的过滤参数
  const [total, setTotal] = useState(0); // 列表总量

  const innerFiltersRef = useRef<Filters>(null); // 内部的过滤参数，最终整合的outerFilter去

  // 请求所带的参数
  const params = useMemo(
    () => ({
      current,
      size,
      ...outerFilters,
    }),
    [current, size, outerFilters],
  );

  // 请求接口的方法
  const { loading, data: dataSource = [], setData: setDataSource } = useRequest(
    () => getData(params),
    [params, flushFlag],
    {
      enhanceResponse: res => {
        // 直接是树状图
        if (Array.isArray(res)) {
          setTotal(0);
          return res;
        }
        // 否则就取一层再返回
        setTotal(res.total);
        return res.records;
      },
    },
  );

  // 表格改变时触发
  const handleTableChange = useCallback(
    (pagination, filters: Filters) => {
      // 处理filter
      const newInnerFilters = { ...filters };

      const needSetOne = !!(
        !isEqual(newInnerFilters, innerFiltersRef.current) &&
        innerFiltersRef.current
      );

      // 保存一下innerFilter
      innerFiltersRef.current = newInnerFilters;

      setCurrent(needSetOne ? 1 : pagination.current || current);
      setOutFilters((f: Filters) => ({ ...f, ...newInnerFilters }));
      setSize(pagination.pageSize);
      // todo 处理sorter
      // setSorters(sorter)
    },
    [current],
  );

  // 模糊搜索方法
  const searchBy = usePersistFn(filter => {
    setCurrent(1);
    setOutFilters(filter);
  });

  // 导出excel的方法
  const exportExcel = useCallback(
    async (excelName: string = 'excelName'): Promise<any> => {
      if (total === 0) {
        window.alert('列表为空，不可导出Excel');
      } else {
        toggleFetchingExcel(true);
        const blob = await getExcelPersisted(params);
        toggleFetchingExcel(false);
        FileSaver.saveAs(blob, excelName);
        return blob;
      }
    },
    [total, toggleFetchingExcel, getExcelPersisted, params],
  );

  // 刷新表格
  const refresh = useCallback(
    (checkDec?: boolean) => {
      if (checkDec) {
        if (dataSource.length === 1 && total !== 1) {
          setCurrent(c => c - 1);
        } else {
          toggleFlushFlag();
        }
      } else {
        toggleFlushFlag();
      }
    },
    [dataSource.length, toggleFlushFlag, total],
  );

  // 作用与table footer的配置
  const setting = useMemo<TableSetting>(() => {
    const onPaginationChange = (pageNum: number, newPageSize: number): void => {
      setSize(newPageSize);
      setCurrent(pageNum);
    };

    return {
      total,
      onPaginationChange,
      current,
      size,
    };
  }, [current, size, total, setSize, setCurrent]);

  // 表单提交
  const submit = usePersistFn((e?: any) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    const { getFieldsValue } = form;
    const values: Filters = getFieldsValue();
    searchBy((r: Filters) => ({ ...r, ...values }));
  });

  // 重置表单
  const reset = usePersistFn(() => {
    const { resetFields } = form;
    resetFields();
    searchBy(() => ({ ...defaultFilters, ...innerFiltersRef.current }));
  });

  return {
    refresh,
    searchBy,
    exportExcel,
    excelLoading: fetchingExcel,
    params,
    setDataSource,
    submit,
    reset,
    // tableProps
    tableProps: {
      dataSource,
      loading,
      onChange: handleTableChange,
      pagination: {
        pageSize: size,
        current,
        total,
      },
      // 以下适用于内部表格
      // 用于自定义table footer
      setting,
    },
  };
}
