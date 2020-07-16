/**
 * title: 手动进行请求
 * desc: 点击请求数据，提供onSuccess可以进行成功回调，提供一个cancel可以废弃请求
 */

import React from 'react';
import { Spin, Button } from 'antd';
import { useRequest } from '@dragon/hooks';

const style = {
  marginLeft: 16,
  marginBottom: 24,
};

const getData = a =>
  new Promise(r => {
    setTimeout(() => {
      r(a);
    }, 1000);
  });

export default () => {
  const { data = '', loading, start, cancel } = useRequest(getData, {
    manual: true,
    onSuccess: res => {
      console.log(res);
    },
  });

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => start(Date.now())}>
        手动获取数据
      </Button>
      <Button type="danger" onClick={() => cancel()} style={style}>
        取消！
      </Button>
      <Spin spinning={loading}>
        <p>{data}</p>
      </Spin>
    </React.Fragment>
  );
};
