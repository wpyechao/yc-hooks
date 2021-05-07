export declare type TArrayAction<T> = {
    push: (item: T) => void;
    pop: () => void;
    shift: () => void;
    unshift: (items: T | T[]) => void;
    slice: (start: number, end: number) => void;
    empty: () => void;
    set: (items: T[]) => void;
    remove: (condition: (item: T, index: number) => boolean) => void;
};
export declare function useArray<T>(initialValue?: T[]): [T[], TArrayAction<T>];
