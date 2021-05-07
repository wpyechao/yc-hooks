---
group:
  title: Hooks
  path: /hooks
---

# usePersistFn

用于持久化一个函数，使得它的引用永远不会变化，并且可以忽略依赖

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```javascript
const fn = usePersistFn(() => {});
```
