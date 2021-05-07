---
group:
  title: Hooks
  path: /hooks
---

# useRequest

一行代码发起异步操作，理论上适用于所有返回 Promise 的异步操作，但由于项目中请求接口比较多，命名为 useRequest

优雅地进行管理请求接口的 loading data 等数据，并且没有副作用

也可进行手动触发

## 代码演示

<code src="./demo/demo1.jsx" />
<code src="./demo/demo2.jsx" />
<code src="./demo/demo3.jsx" />
<code src="./demo/demo4.jsx" />

## API

```javascript
const { data: list = [], loading, start } = useRequest(getList, {
  manual: true,
});
```

### Params

| 参数     | 说明                                       | 类型     | 默认值 |
| -------- | ------------------------------------------ | -------- | ------ |
| function | 必选，传入的异步删除，返回值必须是 Promise | function |        |
| deps     | 可选，依赖数组，改变时自动请求             | []       | []     |
| options  | 可选参数                                   | {}       | {}     |

### options 配置

| 参数            | 说明                                                          | 类型            | 默认值    |
| --------------- | ------------------------------------------------------------- | --------------- | --------- |
| manual          | 可选，是否手动                                                | boolean         | false     |
| pollingInterval | 可选，开启轮训                                                | number          | 0         |
| enhanceResponse | 可选，可以对成功后的数据（写在参数中）进行修改（return 出去） | (res) => newRes | undefined |
| onSuccess       | 可选，请求成功后触发，在 enhanceResponse 之后触发（如果有）   | (res) => void   | undefined |
| onError         | 可选，请求失败后触发，在 enhanceResponse 之后触发（如果有）   | (res) => void   | undefined |

### Return

| 参数    | 说明                                    | 类型     | 默认值          |
| ------- | --------------------------------------- | -------- | --------------- |
| data    | 接口成功后返回的数据                    | any      |                 |
| setData | 可以对返回值进行按需修改，类似 setState | function |                 |
| loading | 是否处于正在请求中                      | boolean  | !options.manual |
| params  | 请求的参数                              |          |
| start   | 手动触发请求的方法                      |          |
| cancel  | 手动取消请求的方法                      |          |
