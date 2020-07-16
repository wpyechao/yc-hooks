---
group:
  title: Hooks
  path: /hooks
---

# useTable

基于 antd table 进行使用，优化了平时刷新表格，查询表格，导出 excel 的操作。

## 代码演示

<code src="./demo/demo1.jsx" />

## API

```javascript
const { refresh, searchBy, ...tableProps } = useTable(getList, getExcel, {
  ...
})
```

### Params

| 参数     | 说明                                                  | 类型     | 默认值 |
| -------- | ----------------------------------------------------- | -------- | ------ |
| getData  | 必选，传入的异步函数，返回值必须是 Promise            | function |        |
| getExcel | 可选，传入的获取 excel 异步函数，返回值必须是 Promise | function |        |
| options  | 可选，配置项，见下表                                  | object   | null   |

### Options 配置项

| 参数           | 说明                  | 类型   | 默认值 |
| -------------- | --------------------- | ------ | ------ |
| defaultFilters | 可选，默认的删选项    | object | {}     |
| form           | 可选，props.form 实例 | object | {}     |

### Return

| 参数          | 说明                                     | 类型                | 默认值   |
| ------------- | ---------------------------------------- | ------------------- | -------- |
| refresh       | 刷新表格的方法                           | any                 | function |
| searchBy      | 查询表格的方法，参数为一个对象           | function            |          |
| exportExcel   | 导出 excel 的方法                        | function(excelName) |          |
| params        | 当前请求列表数据使用到的参数             | object              | null     |
| submit        | 外部表单提交模糊搜索时                   | (e) => void         | null     |
| reset         | 重置外部表单                             | () => void          | null     |
| setDataSource | 可以对 dataSource 进行设置，用于定制列表 | function            | null     |
| tableProps    | 作用与 table 组件上的参数                |
