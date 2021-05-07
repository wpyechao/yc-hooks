/**
 *
 * title: 优雅地管理一个数组
 * desc: 类似原生数组操作，但是数据操作完全immutable
 */

import React from 'react';
import { Button } from 'antd';
import { useArray } from 'yc-hooks';

const array = [
  {
    id: 1,
    name: '平叶超',
  },
  {
    id: 2,
    name: '张三',
  },
];

export default () => {
  const [value, methods] = useArray(array);
  return (
    <div>
      <Button
        onClick={() => methods.push({ id: Date.now(), name: Date.now() })}
      >
        push
      </Button>
      <Button style={{ margin: '0 16px' }} onClick={() => methods.pop()}>
        pop
      </Button>
      <Button onClick={() => methods.shift()}>shift</Button>
      <Button
        style={{ margin: '0 16px' }}
        onClick={() => methods.unshift({ id: Date.now(), name: Date.now() })}
      >
        unshift
      </Button>
      <Button onClick={() => methods.slice(1, 3)}>slice</Button>
      <Button style={{ margin: '0 16px' }} onClick={() => methods.empty()}>
        empty
      </Button>
      <Button onClick={() => methods.set(array.concat())}>set</Button>
      <Button
        style={{ margin: '0 16px' }}
        onClick={() => methods.remove(i => i.id === 2)}
      >
        remove
      </Button>
      <p />
      {value.map(i => (
        <p key={i.id}>{i.name}</p>
      ))}
    </div>
  );
};
