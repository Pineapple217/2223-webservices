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

const createTeam = async (ctx) => {
  const newTeam = await teamService.create(ctx.request.body);
  ctx.body = newTeam;
  ctx.status = 201;
};
createTeam.validationScheme = {
  body: Joi.object({
    name: Joi.string().max(255),
    base: Joi.string().max(255),
    chief: Joi.string().max(255),
    powerUnit: Joi.string().max(255),
    // drivers: Joi.array().items(Joi.number().integer().positive()),
  })
};

const updateTeam = async (ctx) => {
  const updatedTeam = await teamService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = updatedTeam;
  ctx.status = 200;
};
updateTeam.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive()
  }),
  body: Joi.object({
    name: Joi.string().max(255),
    base: Joi.string().max(255),
    chief: Joi.string().max(255),
    powerUnit: Joi.string().max(255),
    // drivers: Joi.array().items(Joi.number().integer().positive()),
  })
};

const deleteTeamById = async (ctx) => {
  const deletedTeam = await teamService.deleteById(ctx.params.id);
  ctx.body = deletedTeam;
  ctx.status = 204;
};
deleteTeamById.validationScheme = {
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
  router.post('/', hasPermission(permissions.write), validate(createTeam.validationScheme), createTeam);
  router.put('/:id', hasPermission(permissions.change), validate(updateTeam.validationScheme), updateTeam);
  router.delete('/:id', hasPermission(permissions.delete), validate(deleteTeamById.validationScheme), deleteTeamById);

  app.use(router.routes()).use(router.allowedMethods());
};
