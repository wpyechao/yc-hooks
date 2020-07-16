import React from 'react';
import { configResponsive, useResponsive } from '@dragon/hooks';

configResponsive({
  xs: 0,
  sm: 576,
  xl: 1200,
});

export default function() {
  const responsive = useResponsive();
  return (
    <>
      <p>Please change the width of the browser window to see the effect: </p>
      {Object.keys(responsive).map(key => (
        <p key={key}>
          {key} {responsive[key] ? '✔' : '✘'}
        </p>
      ))}
    </>
  );
}
