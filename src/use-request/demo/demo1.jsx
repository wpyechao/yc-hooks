/**
 * title: 默认用法
 * desc: 挂载之后默认请求类似didMount中的操作，提供setData可以进行手动修改数据
 */

import React from 'react';
import { Spin, Button } from 'antd';
import { useRequest } from 'yc-hooks';

const getList = () => {
  return new Promise(r => {
    setTimeout(() => {
      r('data from remote server');
    }, 1000);
  });
};

export default () => {
  const { data = '', loading, setData } = useRequest(getList);

  return (
    <Spin spinning={loading}>
      <h2>挂载之后自动请求</h2>
      <Button onClick={() => setData('data from local edit')}>
        手动设置数据
      </Button>
      <p style={{ marginTop: 24 }}>{data}</p>
    </Spin>
  );
};
