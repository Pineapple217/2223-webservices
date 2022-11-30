const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');

const { initializeLogger, getLogger } = require('./core/logging');
const installRest = require('./rest');
const { initializeData } = require('./data/index');

// const NODE_ENV = config.get("env");
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const CORS_MAXAGE = config.get('cors.maxAge');
const CORS_ORIGINS = config.get('cors.origins');

async function main() {
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    //   defaultMeta: { NODE_ENV },
  });

  await initializeData();

  const app = new Koa();

  app.use(
    koaCors({
      maxAge: CORS_MAXAGE,
      allowHeaders: ['Authorization'],
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.origin) !== -1) {
          return ctx.request.headers.origin;
        }
        return CORS_ORIGINS[0];
      },
    })
  );

  const logger = getLogger();

  app.use(bodyParser());

  installRest(app);

  app.listen(9000);
  logger.info('🚀 Server listening on http://localhost:9000');
}

main();
