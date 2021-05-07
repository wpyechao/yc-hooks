import { pxToNum, toFixed } from '../utils';
import React, { useEffect, useRef, useState } from 'react';
import usePersistFn from '../use-persist-fn'

const TRIGGER_MAP = {
  left: 0,
  right: 2,
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

interface IPosition extends IDistance {}

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

function useMouseDrag<T extends HTMLElement>(target: React.RefObject<T>, options?: IOptions<T>) {
  // 持久化外部传入的函数
  const getWrapElement = usePersistFn(options?.getWrapElement);
  const getRelativeElement = usePersistFn(options?.getRelativeElement);

  const onMouseDown = usePersistFn(options?.onMouseDown);
  const onMouseMove = usePersistFn(options?.onMouseMove);
  const onMouseUp = usePersistFn(options?.onMouseUp);

  const revisePosition = usePersistFn(options?.revise?.position);
  const reviseBound = usePersistFn(options?.revise?.bound);
  const reviseDistance = usePersistFn(options?.revise?.distance);

  const { trigger = 'left', effect = 'dom', initialPosition, draggable = true } =
    options || ({} as IOptions<T>);

  const [position, setPosition] = useState(initialPosition || { left: 0, top: 0 });

  /** 是否正在拖拽 */
  const dragging = useRef(false);

  const distance = useRef({ left: 0, top: 0 });

  useEffect(() => {
    const dom = target.current!;
    if (!draggable) return; // 如果不能drag ，直接return

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    const handleMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      // 判断左键还是右键
      if (TRIGGER_MAP[trigger] !== e.button) {
        return;
      }

      dragging.current = true;
      const { clientX, clientY } = e;
      const { left, top } = dom.getBoundingClientRect();

      const tempDistance = {
        left: clientX - left,
        top: clientY - top,
      };

      distance.current = reviseDistance(tempDistance) ?? tempDistance;

      onMouseDown(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      if (dragging.current) {
        const relativeElement = getRelativeElement(dom) || dom.parentElement!;
        const { left: parentLeft, top: parentTop } = relativeElement.getBoundingClientRect();

        const { clientX, clientY } = e;
        const { left, top } = distance.current;

        const { borderWidth } = getComputedStyle(dom.parentElement!);

        const fix = pxToNum(borderWidth);

        let x = clientX - left - fix;
        let y = clientY - top - fix;

        const { width, height } = dom.getBoundingClientRect();

        const {
          left: wrapLeft,
          top: wrapTop,
          width: wrapWidth,
          height: wrapHeight,
        } = (getWrapElement(dom) || document.body)!.getBoundingClientRect();

        const bound: IBound = {
          minX: wrapLeft,
          minY: wrapTop,
          maxX: wrapLeft + wrapWidth - width - fix * 2,
          maxY: wrapTop + wrapHeight - height - fix * 2,
        };

        const { minX, minY, maxX, maxY } = reviseBound(bound) || bound;

        x = x < minX ? minX : x;
        y = y < minY ? minY : y;
        x = x > maxX ? maxX : x;
        y = y > maxY ? maxY : y;

        const tempPosition = {
          left: x - parentLeft,
          top: y - parentTop,
        };

        const position = revisePosition(tempPosition) ?? tempPosition;

        if (effect === 'dom') {
          dom.style.left = `${position.left}px`;
          dom.style.top = `${position.top}px`;
        }

        if (effect === 'state') {
          setPosition(position);
        }

        onMouseMove(e, position);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      dragging.current = false;
      distance.current = { left: 0, top: 0 };
      onMouseUp(e);
    };

    dom.addEventListener('mousedown', handleMouseDown);
    dom.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      dom.removeEventListener('mousedown', handleMouseDown);
      dom.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [trigger, effect, draggable]);

  return {
    position,
  };
}

export default useMouseDrag;
