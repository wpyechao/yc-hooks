import * as React from 'react'
import { Button, message } from 'antd'
import { usePersistFn } from 'yc-hooks'

export interface DemoProps {
  
}

const Demo: React.FC<DemoProps> = (props) => {

  const [state, setState] = React.useState(0)

  const callback = React.useCallback(() => {
    message.success(`callback state: ${state} 始终是0`)
  }, [])  // 没有依赖state，如果有几十个state，也要写上几十个state吗？

  const persist = usePersistFn(() => {
    message.success(`persist state: ${state} 是最新的state`)
  })

  return (
    <div>
      <p>
        最新的state: {state}
      </p>
      <Button type="primary" onClick={() => setState(state + 1)}>add</Button>
      <br />
      <br />
      <Button type="primary" onClick={callback}>callback</Button>
      <br />
      <br />
      <Button type="primary" onClick={persist}>add</Button>
    </div>
  )
}

export default Demo