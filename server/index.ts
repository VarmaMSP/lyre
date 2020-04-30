import Koa from 'koa'
import favicon from 'koa-favicon'
import next from 'next'
import path from 'path'
import { newRouter } from './routes'

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const port = +(process.env.PORT || '8082')
const staticDir = path.resolve('__dirname', '..', 'static')

app
  .prepare()
  .then(() => {
    const server = new Koa()
    const router = newRouter(app)

    server
      .use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
      })
      .use(favicon(path.resolve(staticDir, 'favicon.ico')))
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(port, () => {
        console.log(`UI server running on port ${port}`)
      })
  })
  .catch((err) => {
    console.log(err)
  })
