---
group:
  title: Hooks
  path: /hooks
---

# useArray

优雅地进行管理数组对象

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```javascript
const [
  value,
  {
    push,
    pop,
    shift,
    unshift,
    slice,
    empty,
    set,
    remove
  }
] = useArray(
  defaultValue?: []
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

| 参数    | 说明           | 类型                 | 默认值 |
| ------- | -------------- | -------------------- | ------ |
| push    | 往后追加值     | function(item)       |        |
| pop     | 删除最后的值   | function()           |        |
| shift   | 删除最前面的值 | function()           |        |
| unshift | 在前面追加值   | function(item)       |        |
| slice   | 切割函数       | function(start, end) |        |
| empty   | 置空           | function() => []     |        |
| set     | 重新设置       | function(newArray)   |        |
| remove  | 删除对应的值   | function(condition)  |        |
