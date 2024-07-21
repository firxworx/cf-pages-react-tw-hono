import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { DocumentLayout } from '@/document/DocumentLayout'
import type { AppContext } from '@/types/context.types'
import clockRoutes from '@/api/routes/clock'

export type ApiApp = typeof app
export type ApiRoutes = typeof routes

const app = new Hono<AppContext>()
const documentLayout = renderToString(<DocumentLayout />)

// chain additional routes onto this example so the exported `ApiRoutes` type is accurate
const routes = app.route('/api/clock', clockRoutes)

// global route for get requests to unmatched paths return the html document layout
app.get('*', (c) => {
  return c.html(documentLayout)
})

export default app
