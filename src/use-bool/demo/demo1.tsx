/**
 *
 * title: 优雅地管理一个布尔值
 * desc: 提供toggle 和setTrue setFalse
 */

import React from 'react';
import { Button, Switch } from 'antd';
import { useBool } from 'yc-hooks';

export default () => {
  const [state, methods] = useBool(true);

  return (
    <div>
      <p>
        Effects：
        <Switch checked={state} onChange={methods.toggle} />
      </p>
      <p>
        <Button type="default" onClick={() => methods.toggle()}>
          Toggle
        </Button>
        <Button
          danger
          type="primary"
          onClick={methods.setFalse}
          style={{
            margin: '0 16px',
          }}
        >
          Set false
        </Button>
        <Button type="primary" onClick={methods.setTrue}>
          Set true
        </Button>
      </p>
    </div>
  );
};
