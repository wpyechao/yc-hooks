---
group:
  title: Hooks
  path: /hooks
---

# useCbState

官方 useState 的扩展，可以向 class setState 一样传一个 setState 之后的侯庄村函数。

## 代码演示

<code src="./demo/demo1.jsx" />

## API

```javascript
const [state, setState] = useCbState(initialState);
```

### setState

| 参数     | 说明                | 类型               | 默认值 |
| -------- | ------------------- | ------------------ | ------ |
| newState | 设置的新 state 的值 | any                |        |
| callback | 设置完后的回调函数  | (newState) => void |        |
