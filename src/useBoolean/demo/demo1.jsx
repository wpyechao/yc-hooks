/**
 * title: 基础使用
 * desc: 默认不传参数为切换开关，也可以指定参数进行切换。
 */

import React from 'react';
import { Button, Switch } from 'antd';
import { useBoolean } from '@dragon/hooks';

export default () => {
  const { state, toggle, setTrue, setFalse } = useBoolean(true);
  return (
    <div>
      <p>
        Effects：
        <Switch checked={state} onChange={toggle} />
      </p>
      <p>
        <Button type="default" onClick={() => toggle()}>
          Toggle
        </Button>
        <Button
          type="danger"
          onClick={setFalse}
          style={{
            margin: '0 16px',
          }}
        >
          Set false
        </Button>
        <Button type="primary" onClick={setTrue}>
          Set true
        </Button>
      </p>
    </div>
  );
};
