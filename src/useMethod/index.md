---
group:
  title: Hooks
  path: /hooks
---

# useMethod

给我一个初始值和一堆方法，我帮你变成 hooks，用于封装底层数据结构

## 代码演示

具体用法参考下面的 useArray/useNumber

### 默认用法

```typescript
import { IMethod, useMethod } from '@dragon/hooks';

const boolMethods: IMethod<boolean> = {
  setTrue: () => true,
  setFalse: () => false,
  toggle: (s, n: any) => (n === undefined ? !s : !!n),
};

export function useBool(initialValue: boolean) {
  return useMethod(initialValue, boolMethods);
}
```
