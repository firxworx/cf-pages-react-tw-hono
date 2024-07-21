import { Hono } from 'hono'
import type { AppContext } from '@/types/context.types'

/**
 * Example route with demonstration of Cloudflare Bindings with `c.env.MY_VAR`.
 */
const route = new Hono<AppContext>().get('/', (c) => {
  return c.json({
    var: c.env.MY_VAR,
    time: new Date().toLocaleTimeString(),
  })
})

export default route
