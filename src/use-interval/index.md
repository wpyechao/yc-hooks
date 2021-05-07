---
group:
  title: Hooks
  path: /hooks
---

# useInterval

优雅的管理定时器，可用在倒计时按钮等

## 代码演示

<code src="./demo/demo1.jsx" />

## API

```javascript
const { counting, start, cancel } = useInterval(() => {
  // codes
}, 1000, {
  manual?: false
});
```

### Result

| 参数     | 说明                       | 类型     | 默认值 |
| -------- | -------------------------- | -------- | ------ |
| callback | 必选，传入的重复执行的函数 | function |        |
| delay    | 定时器的时间               | number   |        |
| options  | 配置项                     | {}       | {}     |

### options 配置

| 参数   | 说明                     | 类型    | 默认值 |
| ------ | ------------------------ | ------- | ------ |
| manual | 可选，是否手动启动定时器 | boolean | false  |

### Result

| 参数     | 说明             | 类型     | 默认值 |
| -------- | ---------------- | -------- | ------ |
| counting | 是否处于计时状态 | boolean  |        |
| start    | 启动定时器的函数 | function |        |
| cancel   | 关闭定时器的函数 | function |        |
