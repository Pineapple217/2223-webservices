const Router = require('@koa/router');
const Joi = require('joi');

const { hasPermission, permissions } = require('../core/auth');
const driverService = require('../service/drivers');

const validate = require('./_validation');


const getAllDrivers = async (ctx) => {
  ctx.body = await driverService.getAll();
  ctx.status = 200;
};

getAllDrivers.validationScheme = null;

const getDriverById = async (ctx) => {
  ctx.body = await driverService.getById(parseInt(ctx.params.id));
};

getDriverById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  })
};

const deleteDriverById = async (ctx) => {
  ctx.body = await driverService.deleteById(parseInt(ctx.params.id));
  ctx.status = 204;
};

deleteDriverById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  })
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/drivers',
  });

  router.get('/', hasPermission(permissions.read), validate(getAllDrivers.validationScheme), getAllDrivers);
  router.get('/:id', hasPermission(permissions.read), validate(getDriverById.validationScheme), getDriverById);
  router.delete('/:id', hasPermission(permissions.delete),validate(deleteDriverById.validationScheme), deleteDriverById);

  app.use(router.routes()).use(router.allowedMethods());
};
