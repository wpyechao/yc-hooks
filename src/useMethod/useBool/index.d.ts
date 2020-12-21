export declare type TRes = {
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
};
export declare function useBool(initialValue?: boolean): [boolean, TRes];
