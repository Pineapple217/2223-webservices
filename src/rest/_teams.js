const Router = require('@koa/router');

const teamService = require('../service/teams');

const getAllTeams = async (ctx) => {
  ctx.body = await teamService.getAll();
};

const getTeamById = async (ctx) => {
  ctx.body = await teamService.getById(parseInt(ctx.params.id));
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/teams',
  });

  router.get('/', getAllTeams);
  router.get('/:id', getTeamById);

  app.use(router.routes()).use(router.allowedMethods());
};
