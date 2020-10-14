import { useLayoutEffect, useState, useMemo, useRef } from 'react';

type TViewport = {
  height: number
  width: number
}

function getVpHeight() {
  return window.innerHeight || document.documentElement.clientHeight
}

function getVpWidth() {
  return window.innerWidth || document.documentElement.clientWidth
}

const Subscribers = new Set<(state: TViewport) => any>()

function handleResize() {
  const height = getVpHeight()
  const width = getVpWidth()

  for (const callback of Subscribers) {
    callback({ width, height })
  }
}

function useViewport(debounce: number | false = false) {
  const [{ width, height }, setViewport] = useState<TViewport>(() => ({
    width: getVpWidth(),
    height: getVpHeight(),
  }))

  const timer = useRef<number>(0)

  const listener = useMemo<(s: TViewport) => void>(() => {
    if(debounce) {
      return (state) => {
        if(timer.current) {
          window.clearTimeout(timer.current)
        }
        timer.current = window.setTimeout(() => {
          setViewport(state)
        }, debounce);
      }
    } else {
      return (state) => setViewport(state)
    }
  }, [debounce])

  useLayoutEffect(() => {

    if(Subscribers.size === 0) {
      window.addEventListener('resize', handleResize)
    }

    Subscribers.add(listener)
    handleResize()

    return () => {
      Subscribers.delete(listener)

      if(Subscribers.size === 0) {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [listener])

  return [width, height]
}

export default useViewport