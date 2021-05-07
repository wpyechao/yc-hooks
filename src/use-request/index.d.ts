import { DependencyList } from 'react';
import { Options, FetchResult } from './types';
declare function useRequest<T = any>(request: (...args: any[]) => Promise<T>, deps?: DependencyList | Options<T>, options?: Options<T>): FetchResult<T>;
export default useRequest;
