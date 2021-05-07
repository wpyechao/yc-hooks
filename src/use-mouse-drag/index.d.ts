import React from 'react';
declare const TRIGGER_MAP: {
    left: number;
    right: number;
};
interface IBound {
    maxX: number;
    minX: number;
    maxY: number;
    minY: number;
}
interface IDistance {
    left: number;
    top: number;
}
interface IPosition extends IDistance {
}
interface IOptions<T> {
    /** 左键触发还是右键触发，默认左键 */
    trigger?: keyof typeof TRIGGER_MAP;
    /** 直接修改dom还是使用state，默认dom */
    effect?: 'dom' | 'state';
    /** 是否可进行拖拽, 默认true */
    draggable?: boolean;
    /** effect 是state 时 初始的 position */
    initialPosition?: IPosition;
    /** 指定不能拖拽出范围的元素，默认是document.body */
    getWrapElement?: (target: T) => HTMLElement | null;
    /** 指定position: relative 的元素 默认是 parentElement */
    getRelativeElement?: (target: T) => HTMLElement | null;
    /** 鼠标按下的回调 */
    onMouseDown?: (e?: MouseEvent) => void;
    /** 鼠标移动的回调 */
    onMouseMove?: (e: MouseEvent, position: IPosition) => void;
    /** 鼠标抬起的回调 */
    onMouseUp?: (e?: MouseEvent) => void;
    /** 用于修改诸如缩放等影响dom大小之后带来的副作用 */
    revise?: {
        /** 修改鼠标按下时鼠标位置距离dom左上角的位置 */
        distance?: (distance: IDistance) => IDistance;
        /** 修改absolute 的位置 */
        position?: (position: IPosition) => IPosition;
        /** 修改不能dom元素超出的边界值 */
        bound?: (bound: IBound) => IBound;
    };
}
declare function useMouseDrag<T extends HTMLElement>(target: React.RefObject<T>, options?: IOptions<T>): {
    position: IPosition;
};
export default useMouseDrag;
