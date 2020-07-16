---
group:
  title: Hooks
  path: /hooks
---

# useToggle

用于在两个状态值间切换的 Hook。

## 代码演示

<code src="./demo/demo1.jsx" />

## API

```javascript
const {
  state,
  toggle,
  setLeft,
  setRight
} = useToggle(
  defaultValue?: boolean,
);

const {
  state,
  toggle,
  setLeft,
  setRight
} = useToggle(
  defaultValue: any = false,
  reverseValue?: any,
);
```

### Result

| 参数     | 说明                                              | 类型                                                    |
| -------- | ------------------------------------------------- | ------------------------------------------------------- |
| state    | 状态值                                            | boolean                                                 |
| toggle   | 触发状态更改的函数,可以接受两个可选参数修改状态值 | (defaultValue: any = false, reverseValue?: any) => void |
| setLeft  | 设置为默认值                                      | () => void                                              |
| setRight | 设置为相反值                                      | () => void                                              |

### Params

| 参数         | 说明                     | 类型                                     | 默认值 |
| ------------ | ------------------------ | ---------------------------------------- | ------ |
| defaultValue | 可选项，传入默认的状态值 | number \| string \| boolean \| undefined | false  |
| reverseValue | 可选项，传入取反的状态值 | number \| string \| boolean \| undefined | -      |
