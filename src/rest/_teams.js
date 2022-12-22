const Router = require('@koa/router');
const Joi = require('joi');

const { hasPermission, permissions } = require('../core/auth');
const teamService = require('../service/teams');

const validate = require('./_validation');

const getAllTeams = async (ctx) => {
  ctx.body = await teamService.getAll();
};

getAllTeams.validationScheme = null;

const getTeamById = async (ctx) => {
  ctx.body = await teamService.getById(parseInt(ctx.params.id));
};

getTeamById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  })
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/teams',
  });

  router.get('/', hasPermission(permissions.read), validate(getAllTeams.validationScheme), getAllTeams);
  router.get('/:id', hasPermission(permissions.read), validate(getTeamById.validationScheme), getTeamById);

  app.use(router.routes()).use(router.allowedMethods());
};
