/**
 * title: 对返回的数据进行格式化。
 * desc: 有时候后端给的数据可能需要一些格式转换，所以提供enhanceResponse对数据进行格式化
 */

import React from 'react';
import { Spin } from 'antd';
import { useRequest } from 'yc-hooks';

const getList = p =>
  new Promise(r => {
    setTimeout(() => {
      r('data from remote server');
    }, 1000);
  });

export default () => {
  const { data = '', loading } = useRequest(getList, {
    enhanceResponse: res => {
      return `enhanced: ${res}`;
    },
  });

  return <Spin spinning={loading}>{data}</Spin>;
};
