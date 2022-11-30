const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const emoji =require('node-emoji');

const { initializeLogger, getLogger } = require('./core/logging');
const installRest = require('./rest');
const { initializeData, shutdownData } = require('./data/index');
const ServiceError = require('./core/serviceError');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const CORS_MAXAGE = config.get('cors.maxAge');
const CORS_ORIGINS = config.get('cors.origins');

module.exports = async function createServer() {
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
  app.use(async (ctx, next) => {
    logger.info(`${emoji.get('fast_forward')} ${ctx.method} ${ctx.url}`);

    const getStatusEmoji = () => {
      if(ctx.status >= 500) return emoji.get('skull');
      if(ctx.status >= 400) return emoji.get('x');
      if(ctx.status >= 300) return emoji.get('rocket');
      if(ctx.status >= 200) return emoji.get('white_check_mark');
      return emoji.get('rewind');
    };

    try {
      await next();
      logger.info(`${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`);
    } catch (error) {
      logger.error(`${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`, {
        error
      });
      throw error;
    }
  });

  app.use(async (ctx, next) => {
    try {
      await next();

      if (ctx.status === 404) {
        ctx.status = 404;
        ctx.body = {
          code: 'NOT_FOUND',
          message: `Unknow resaurce= ${ctx.url}`,
        };
      }
    } catch (error) {
      let statusCode = error.status || 500;
      let errorBody = {
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== 'production' ? error.stack: undefined
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) statusCode = 404;
        else if (error.isValidationFailed) statusCode = 400;
        else if (error.isUnauthorized) statusCode = 401;
        else if (error.isForbidden) statusCode = 403;
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  installRest(app);


  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        app.listen(9000);
        logger.info(`${emoji.get('rocket')} Server listening on http://localhost:9000`);
        resolve();
      });
    },
    async stop(){{
      app.removeAllListeners();
      await shutdownData();
      getLogger().info('Goodbye');
    }}
  };
};