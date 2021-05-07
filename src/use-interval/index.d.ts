interface IOption {
    manual?: boolean;
}
interface Return<T> {
    counting: boolean;
    start: T;
    cancel: () => void;
}
declare type Fn = (...args: any[]) => any;
declare function useInterval<T extends Fn>(callback: T, delay: number, options?: IOption): Return<T>;
export default useInterval;
