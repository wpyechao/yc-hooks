interface IOption {
    manual?: boolean;
}
declare function useInterval(callback: (...args: any[]) => void, delay: number, options?: IOption): {
    counting: boolean;
    cancel: () => void;
    start: () => void;
};
export default useInterval;
