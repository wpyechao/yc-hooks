import { Result, Func, Options } from './types';
export default function useTable<T>(getData: Func<any>, getExcel?: Func<any> | Options, options?: Options): Result;
