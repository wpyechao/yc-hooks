import * as React from 'react';
interface IOptions<T> {
    /** 指定不能拖拽出范围的元素，默认是document.body */
    getWrapElement?: (target: T) => HTMLElement | null;
    onMouseDown?: (e?: MouseEvent) => void;
    onMouseMove?: (e?: MouseEvent) => void;
    onMouseUp?: (e?: MouseEvent) => void;
}
declare function useMouseDrag<T extends HTMLElement>(target: React.RefObject<T>, options?: IOptions<T>): void;
export default useMouseDrag;
