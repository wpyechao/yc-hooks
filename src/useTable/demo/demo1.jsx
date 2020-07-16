import React from 'react';
import { Card, message, Button, Table, Menu, Form, Input, Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useTable } from '@dragon/hooks';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    defaultFilteredValue: 'all',
    filterDropdown: ({ selectedKeys, setSelectedKeys, confirm }) => (
      <Menu
        onClick={({ key }) => {
          setSelectedKeys(key);
          confirm();
        }}
        selectedKeys={selectedKeys}
      >
        <Menu.Item key="all">all</Menu.Item>
        <Menu.Item key="17">17</Menu.Item>
        <Menu.Item key="18">18</Menu.Item>
        <Menu.Item key="19">19</Menu.Item>
      </Menu>
    ),
    filterIcon: <CaretDownOutlined />,
  },
];

const Tab = props => {
  const [form] = Form.useForm();

  const {
    refresh,
    submit,
    reset,
    exportExcel,
    excelLoading,
    tableProps,
  } = useTable(getList, getExcel, {
    defaultFilters: { default: 'defaultFilter' },
    form,
  });

  return (
    <Card>
      <Form form={form}>
        <Form.Item name="field1">
          <Input placeholder="field1" />
        </Form.Item>
        <Form.Item name="field2">
          <Input placeholder="field2" />
        </Form.Item>
        <Form.Item name="field3">
          <Select onSelect={submit} placeholder="field3">
            <Select.Option value={1}>1</Select.Option>
            <Select.Option value={2}>2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={submit}>
            查询
          </Button>
          <Button onClick={reset}>重置</Button>
          <Button
            loading={excelLoading}
            type="primary"
            onClick={() => exportExcel('excel')}
          >
            导出excel
          </Button>
        </Form.Item>
      </Form>
      <p>
        <Button type="primary" onClick={refresh}>
          刷新
        </Button>
      </p>
      <Table rowKey="id" columns={columns} {...tableProps} />
    </Card>
  );
};

function getList(params) {
  message.loading(`使用${JSON.stringify(params)}请求中`);
  return new Promise(r => {
    setTimeout(() => {
      r({
        records: new Array(55).fill(0).map((t, i) => ({
          id: i,
          name: 'name',
          age: 'age',
        })),
        total: 55,
      });
    }, 1000);
  });
}

function getExcel(params) {
  message.loading(`使用${JSON.stringify(params)}下载excel中`);
  return new Promise(r => {
    setTimeout(() => {
      r('我是发过来的excel');
    }, 1000);
  });
}

export default Tab;
