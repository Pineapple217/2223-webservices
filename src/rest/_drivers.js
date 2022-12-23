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
  ctx.body = await driverService.getById(ctx.params.id);
  ctx.status = 201;
};
getDriverById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  })
};

const createDriver = async (ctx) => {
  const newDriver = await driverService.create(ctx.request.body);
  ctx.body = newDriver;
  ctx.status = 201;
};
createDriver.validationScheme = {
  body: Joi.object({
    firstName: Joi.string().max(255),
    lastName: Joi.string().max(255),
    shortName: Joi.string().max(3),
    country: Joi.string().max(255),
    number: Joi.number().integer().positive().less(100),
    dateOfBirth: Joi.date(),
    teamId: Joi.number().integer().positive(),
    // races: Joi.array().items(Joi.number().integer().positive()),
  })
};

const updateDriver = async (ctx) => {
  const updatedDriver = await driverService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = updatedDriver; 
  ctx.status = 200;
};
updateDriver.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive()
  }),
  body: Joi.object({
    firstName: Joi.string().max(255),
    lastName: Joi.string().max(255),
    shortName: Joi.string().max(3),
    country: Joi.string().max(255),
    number: Joi.number().integer().positive().less(100),
    dateOfBirth: Joi.date(),
    teamId: Joi.number().integer().positive(),
    // races: Joi.array().items(Joi.number().integer().positive()),
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
  router.post('/', hasPermission(permissions.write), validate(createDriver.validationScheme), createDriver);
  router.put('/:id', hasPermission(permissions.change), validate(updateDriver.validationScheme), updateDriver);
  router.delete('/:id', hasPermission(permissions.delete), validate(deleteDriverById.validationScheme), deleteDriverById);

  app.use(router.routes()).use(router.allowedMethods());
};
