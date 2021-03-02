import usePersistFn from '../usePersistFn'
import * as React from 'react';

interface IOptions<T> {
  /** 指定不能拖拽出范围的元素，默认是document.body */
  getWrapElement?: (target: T) => HTMLElement | null;
  onMouseDown?: (e?: MouseEvent) => void;
  onMouseMove?: (e?: MouseEvent) => void;
  onMouseUp?: (e?: MouseEvent) => void;
}

function useMouseDrag<T extends HTMLElement>(
  target: React.RefObject<T>,
  options?: IOptions<T>
) {
  const getWrapElement = usePersistFn(options?.getWrapElement);
  const onMouseDown = usePersistFn(options?.onMouseDown);
  const onMouseMove = usePersistFn(options?.onMouseMove);
  const onMouseUp = usePersistFn(options?.onMouseUp);

  const dragging = React.useRef(false);

  const downPosition = React.useRef({ left: 0, top: 0 });

  React.useEffect(() => {
    const dom = target.current;
    if (!dom) return;

    const handleMouseDown = (e: MouseEvent) => {
      dragging.current = true;
      const { clientX, clientY } = e;
      const { left, top } = dom.getBoundingClientRect();

      downPosition.current = {
        left: clientX - left,
        top: clientY - top
      };
      onMouseDown(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        const {
          left: parentLeft,
          top: parentTop
        } = dom.parentElement!.getBoundingClientRect();
        const { clientX, clientY } = e;
        const { left, top } = downPosition.current;

        const { borderWidth } = getComputedStyle(dom.parentElement!);

        let x = clientX - left;
        let y = clientY - top;

        const { width, height } = dom.getBoundingClientRect();

        const {
          left: wrapLeft,
          top: wrapTop,
          right: wrapRight,
          bottom: wrapBottom
        } = (getWrapElement(dom) || document.body)!.getBoundingClientRect();

        const minX = wrapLeft - parseInt(borderWidth, 10);
        const minY = wrapTop - parseInt(borderWidth, 10);
        const maxX = wrapRight - width - parseInt(borderWidth, 10);
        const maxY = wrapBottom - height - parseInt(borderWidth, 10);

        x = x < minX ? minX : x;
        y = y < minY ? minY : y;

        x = x > maxX ? maxX : x;
        y = y > maxY ? maxY : y;

        dom.style.left = `${x - parentLeft}px`;
        dom.style.top = `${y - parentTop}px`;
        onMouseMove(e);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      dragging.current = false;
      downPosition.current = { left: 0, top: 0 };
      onMouseUp(e);
    };

    dom.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      dom.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useMouseDrag