/**
 *
 * title: 计数器用法
 * desc: 点击开始或者停止，卸载自动注销
 */

import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { useInterval } from '@dragon/hooks';

export default () => {
  const [state, setState] = useState(0);

  const { start, cancel, counting } = useInterval(
    () => {
      setState(r => r + 1);
    },
    1000,
    {
      manual: true,
    },
  );

  return (
    <Card>
      <p>正在计数吗？ {counting ? '是' : '否'}</p>
      <p>
        <Button type="primary" onClick={start}>
          开始
        </Button>
        <Button type="danger" onClick={cancel}>
          停止
        </Button>
      </p>
      <Card>{state}</Card>
    </Card>
  );
};
