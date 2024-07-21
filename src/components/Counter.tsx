import { useState } from 'react'
import { Button } from '@/components/Button'

export function Counter(): JSX.Element {
  const [count, setCount] = useState(0)

  return <Button onClick={() => setCount(count + 1)}>You clicked me {count} times</Button>
}
