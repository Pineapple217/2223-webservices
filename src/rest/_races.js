const Router = require('@koa/router');
const raceService = require('../service/races');

const getAllRaces = async (ctx) => {
  ctx.body = await raceService.getAll()
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/races',
  });

  router.get('/', getAllRaces);
  // router.put('/:id', updatePlace);

  app.use(router.routes()).use(router.allowedMethods());
};