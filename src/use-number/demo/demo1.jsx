/**
 *
 * title: 基础使用
 * desc: 管理一个number
 */

import React from 'react';
import { Button } from 'antd';
import { useNumber } from 'yc-hooks';

export default () => {
  const [value, methods] = useNumber(100);
  return (
    <div>
      <p>{value}</p>
      <p>
        <Button onClick={methods.increment}>increment</Button>
        <Button style={{ margin: '0 16px' }} onClick={methods.decrement}>
          decrement
        </Button>
        <Button onClick={() => methods.add(10)}>add 10</Button>
        <Button
          style={{ margin: '0 16px' }}
          onClick={() => methods.subtract(5)}
        >
          subtract 5
        </Button>
        <Button onClick={() => methods.multiply(2)}>multiply 2</Button>
        <Button style={{ margin: '0 16px' }} onClick={() => methods.divide(2)}>
          divide 2
        </Button>
        <Button onClick={() => methods.set(30)}>set to 30</Button>
      </p>
    </div>
  );
};
