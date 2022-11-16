const Router = require('@koa/router');
const teamService = require('../service/teams');

const getAllTeams = async (ctx) => {
  ctx.body = await teamService.getAll()
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/teams',
  });

  router.get('/', getAllTeams);
  // router.put('/:id', updatePlace);

  app.use(router.routes()).use(router.allowedMethods());
};