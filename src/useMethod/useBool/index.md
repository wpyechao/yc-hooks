---
group:
  title: Hooks
  path: /hooks
---

# useBool

优雅地进行管理布尔值对象

## 代码演示

<code src="./demo/demo1.jsx" />

## API

```javascript
const [
  value,
  {
    toggle,
    setTrue,
    setFalse
  }
] = useBool(
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

| 参数     | 说明            | 类型           | 默认值 |
| -------- | --------------- | -------------- | ------ |
| toggle   | 切换 true/false | function(bool) |        |
| setTrue  | 设置成 true     | function()     |        |
| setFalse | 设置成 false    | function()     |        |
