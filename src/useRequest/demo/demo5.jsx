/**
 * title: 轮训请求。
 * desc: pollingInterval参数支持请求的轮训
 */

import React from 'react';
import { Spin } from 'antd';
import { useRequest } from 'yc-hooks';

const getData = p => {
  return new Promise(r => {
    setTimeout(() => {
      r(new Date().toLocaleTimeString());
    }, 500);
  });
};

export default () => {
  const { data = '', params, loading, cancel, start } = useRequest(
    () => getData(Math.random()),
    {
      pollingInterval: 2000,
      enhanceResponse: res => {
        return `当前的时间: ${res}`;
      },
    },
  );

  return (
    <div>
      <Spin spinning={loading}>{data}</Spin>
      <button onClick={start}>开始</button>
      <button onClick={cancel}>取消</button>
    </div>
  );
};
