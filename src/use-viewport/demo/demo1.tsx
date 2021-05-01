import * as React from 'react';
import { useViewport } from 'yc-hooks';

export default () => {
  const [width, height] = useViewport(300)

  return (
    <div>
      resize 试试 <br />
      {width} <br />
      {height}
    </div>
  )
}