
process.env.NODE_ENV = 'development'; //TODO: for test

import http from 'http';
import Koa from 'koa';
import path from 'path';
import views from 'koa-views';
import convert from 'koa-convert';
import json from 'koa-json';
import Bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import koaStatic from 'koa-static-plus';
import koaOnError from 'koa-onerror';
import Pug from 'koa-pug';
import config from './config';
import routes from './routes';
import Mongo from 'koa-mongo';

const app = new Koa();
const bodyparser = Bodyparser();
const isDev = process.env.NODE_ENV === "development";

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

app.use(Mongo({
  uri: 'mongodb://localhost:27017/koa-db',
  max: 100,
  min: 1
}));


// static
app.use(convert(koaStatic(path.join(__dirname, './static'), {
  pathPrefix: '/static'
})));

// views
new Pug({
  viewPath: path.join(__dirname, './views'),
  debug: isDev,
  pretty: isDev,
  compileDebug: isDev,
  noCache: isDev,
  locals: {},
  app: app
});

// 500 error
koaOnError(app, {
  engine: 'pug',
  template: path.join(__dirname, './views/500.pug')
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response router
app.use(async (ctx, next) => {
  await routes.routes()(ctx, next);
});

// 404
app.use(async (ctx) => {
  ctx.status = 404;
  await ctx.render('404');
});

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err);
});

const port = parseInt(config.port || '3000');
const server = http.createServer(app.callback());

server.listen(port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  console.log('Listening on port: %d', port);
});

export default app;
