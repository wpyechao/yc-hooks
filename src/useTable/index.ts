import { useCallback, useRef, useState, useMemo } from 'react';
import isEqual from 'lodash.isequal';
import { Result, Func, Options, Filters } from './types';
import useRequest from '../useRequest';
import { usePersistFn } from '..';

export default function useTable(
  getData: Func<any>,
  options?: Options,
): Result {
  const { defaultFilters = {} as Filters, form = {} as any } = options || {} as Options;

  const [current, setCurrent] = useState<number>(1); // pageNo
  const [size, setSize] = useState(10); // pageSize
  const [total, setTotal] = useState(0); // 列表总量

  const [outerFilters, setOutFilters] = useState<Filters>(defaultFilters); // 外部的过滤参数

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
  const { loading, data: dataSource, setData: setDataSource, start: refresh } = useRequest(
    () => getData(params),
    [params],
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
    },
  };
}
