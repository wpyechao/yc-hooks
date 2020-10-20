declare type IState = string | number | boolean | undefined;
declare function useToggle<T extends IState = IState>(defaultValue: T): {
    state: T;
    toggle: (value?: T) => void;
    setLeft: () => void;
    setRight: () => void;
};
export default useToggle;
