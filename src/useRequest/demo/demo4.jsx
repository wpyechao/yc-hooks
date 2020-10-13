/**
 * title: onSuccess 和 onError
 * desc: onSuccess和onError分别对应成功和失败的回调
 */

import React from 'react';
import { Spin, Button, message } from 'antd';
import { useRequest } from 'yc-hooks';

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
  const { data = '', error = {}, loading, start } = useRequest(getData, {
    manual: true,
    onSuccess: res => {
      console.log(res);
      message.success('我是成功');
    },
    onError: res => {
      console.log(res);
      message.error('我是失败');
    },
  });

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => start(Date.now())}>
        成功！
      </Button>
      <Button
        type="danger"
        onClick={() => start(new Error('failed'))}
        style={style}
      >
        失败！
      </Button>
      <Spin spinning={loading}>
        <p>{error.message}</p>
        <p>{data}</p>
      </Spin>
    </React.Fragment>
  );
};
