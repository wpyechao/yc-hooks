/**
 *
 * title: 基础用法
 * desc: 使用回调
 */

import React from 'react';
import { Card, Button, message } from 'antd';
import { useCbState } from '@dragon/hooks';

const Demo = () => {
  const [state, setState] = useCbState('old state');

  const handleClick = () =>
    setState('new state', newState => {
      message.success('我是设置完state之后的回调' + '并且能拿到' + newState);
    });

  return (
    <Card>
      <Button onClick={handleClick}>点击我改变state</Button>
      <p style={{ marginTop: 24 }}>{state}</p>
    </Card>
  );
};

export default Demo;
