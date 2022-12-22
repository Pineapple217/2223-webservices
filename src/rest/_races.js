const Router = require('@koa/router');
const Joi = require('joi');

const { hasPermission, permissions } = require('../core/auth');
const raceService = require('../service/races');

const validate = require('./_validation');


const getAllRaces = async (ctx) => {
  ctx.body = await raceService.getAll();
};

getAllRaces.validationScheme = null;

const getRaceById = async (ctx) => {
  ctx.body = await raceService.getById(parseInt(ctx.params.id));
};

getRaceById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  })
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/races',
  });

  router.get('/', hasPermission(permissions.read), validate(getAllRaces.validationScheme) ,getAllRaces);
  router.get('/:id', hasPermission(permissions.read), validate(getRaceById.validationScheme), getRaceById);

  app.use(router.routes()).use(router.allowedMethods());
};
