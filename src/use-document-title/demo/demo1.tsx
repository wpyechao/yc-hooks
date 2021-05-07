/**
 * title: 基础使用
 * desc: 修改title
 */

import React from 'react';
import { Card } from 'antd';
import { useDocumentTitle } from 'yc-hooks';

const Demo = () => {
  useDocumentTitle('？我被修改了');

  return <Card>看document title</Card>;
};

export default Demo;
