const Router = require('@koa/router');

const raceService = require('../service/races');

const getAllRaces = async (ctx) => {
  ctx.body = await raceService.getAll();
};

const getRaceById = async (ctx) => {
  ctx.body = await raceService.getById(parseInt(ctx.params.id));
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/races',
  });

  router.get('/', getAllRaces);
  router.get('/:id', getRaceById);

  app.use(router.routes()).use(router.allowedMethods());
};
