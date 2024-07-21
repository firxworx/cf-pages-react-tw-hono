import { useState } from 'react'
import { Button } from '@/components/Button'

export function ClockButton(): JSX.Element {
  const [response, setResponse] = useState<string | null>(null)

  const handleClick = async () => {
    const response = await fetch('/api/clock')
    const data = await response.json()

    // biome-ignore lint/performance/noAccumulatingSpread: boilerplate example
    const headers = Array.from(response.headers.entries()).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    }

    setResponse(JSON.stringify(fullResponse, null, 2))
  }

  return (
    <>
      <Button onClick={handleClick}>Server Time</Button>
      {response && <pre>{response}</pre>}
    </>
  )
}
