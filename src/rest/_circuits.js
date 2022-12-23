const Router = require('@koa/router');
const Joi = require('joi');

const { hasPermission, permissions } = require('../core/auth');
const circuitService = require('../service/circuits');

const validate = require('./_validation');

const getAllCircuits = async (ctx) => {
  ctx.body = await circuitService.getAll();
};
getAllCircuits.validationScheme = null;

const getCircuitById = async (ctx) => {
  ctx.body = await circuitService.getById(ctx.params.id);
};
getCircuitById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  })
};

const createCircuit = async (ctx) => {
  const newCircuit = await circuitService.create(ctx.request.body);
  ctx.body = newCircuit;
  ctx.status = 201;
};
createCircuit.validationScheme = {
  body: Joi.object({
    city: Joi.string().max(255),
    name: Joi.string().max(255),
    nrOfLaps: Joi.number().integer().positive(),
    length: Joi.number(),
  })
};

const updateCircuit = async (ctx) => {
  const updatedCircuit = await circuitService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = updatedCircuit;
  ctx.status = 200;
};
updateCircuit.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive()
  }),
  body: Joi.object({
    city: Joi.string().max(255),
    name: Joi.string().max(255),
    nrOfLaps: Joi.number().integer().positive(),
    length: Joi.number(),
  })
};

const deleteCircuitById = async (ctx) => {
  ctx.body = await circuitService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteCircuitById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  })
};



module.exports = (app) => {
  const router = new Router({
    prefix: '/circuits',
  });

  router.get('/', hasPermission(permissions.read), validate(getAllCircuits.validationScheme), getAllCircuits);
  router.get('/:id', hasPermission(permissions.read), validate(getCircuitById.validationScheme), getCircuitById);
  router.post('/', hasPermission(permissions.write), validate(createCircuit.validationScheme), createCircuit);
  router.put('/:id', hasPermission(permissions.change), validate(updateCircuit.validationScheme), updateCircuit);
  router.delete('/:id', hasPermission(permissions.delete), validate(deleteCircuitById.validationScheme), deleteCircuitById);

  app.use(router.routes()).use(router.allowedMethods());
};