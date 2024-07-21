import { ClockButton } from '@/components/ClockButton'
import { Counter } from '@/components/Counter'

function App(): JSX.Element {
  return (
    <main className="container mx-auto mt-12">
      <div className="prose">
        <h1>Hello, Hono with React!</h1>
        <h2>Example of useState()</h2>
        <p className="text-slate-700 italic">This text is italic because of tailwind classes.</p>
        <p>
          Example with client-side <code>useState</code>:
        </p>
        <Counter />
        <h2>Example of API fetch()</h2>
        <p>
          Fetch server time from the <code>/api/clock</code> endpoint:
        </p>
        <ClockButton />
      </div>
    </main>
  )
}

export default App
