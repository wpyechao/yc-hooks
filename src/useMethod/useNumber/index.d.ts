export declare type TActions = {
    increment: () => void;
    decrement: () => void;
    add: (a: number) => void;
    subtract: (a: number) => void;
    multiply: (a: number) => void;
    divide: (a: number) => void;
    set: (a: number) => void;
};
export declare function useNumber(initialValue?: number): [number, TActions];
