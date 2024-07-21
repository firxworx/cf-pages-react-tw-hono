import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('React app mount point #root not found in the document.')
}

let root: ReactDOM.Root | null = null

const render = (Component: React.ComponentType): void => {
  if (!root) {
    root = ReactDOM.createRoot(rootElement)
  }

  root.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>,
  )
}

render(App)

if (import.meta.hot) {
  import.meta.hot.accept('./App', (newApp) => {
    console.info('Hot-reloading: App')

    if (newApp) {
      render(newApp.default)
    }
  })
}
