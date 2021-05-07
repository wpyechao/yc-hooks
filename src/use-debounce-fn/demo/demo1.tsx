import { Button } from 'antd'
import * as React from 'react'
import { useDebounceFn } from 'yc-hooks'

export interface DemoProps {
  
}

const Demo: React.FC<DemoProps> = (props) => {

  const [state, setState] = React.useState(0)

  const debounce = useDebounceFn((num = 1) => {
    setState(state + num)
  }, 1000)

  return (
    <div>
      <p>
        state: {state}
      </p>
      <Button onClick={() => debounce(2)}>
        debounce add 2
      </Button>
    </div>
  )
}

export default Demo