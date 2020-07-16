---
group:
  title: Hooks
  path: /hooks
---

# useNumber

优雅地进行管理一个数字

## 代码演示

<code src="./demo/demo1.jsx" />

## API

```javascript
const [
  value,
  {
    increment,
    decrement,
    add,
    subtract,
    multiply,
    divide,
    set,
  }
] = useNumber(
  defaultValue?: boolean
);
```

### Result

| 参数             | 说明       | 类型 |
| ---------------- | ---------- | ---- |
| [value, methods] | 详情见下面 | []   |

### value

| 参数  | 说明     | 类型 |
| ----- | -------- | ---- |
| value | 对应的值 | []   |

### methods

| 参数      | 说明     | 类型             | 默认值 |
| --------- | -------- | ---------------- | ------ |
| increment | + 1      | function()       |        |
| decrement | - 1      | function()       |        |
| add       | 加操作   | function(num)    |        |
| subtract  | 减操作   | function(num))   |        |
| multiply  | 乘操作   | function(num)    |        |
| divide    | 除操作   | function(num)    |        |
| set       | 重新设置 | function(newNum) |        |
