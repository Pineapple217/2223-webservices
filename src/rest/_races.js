const Router = require('@koa/router');
const Joi = require('joi');

const { hasPermission, permissions } = require('../core/auth');
const raceService = require('../service/races');

const validate = require('./_validation');


const getAllRaces = async (ctx) => {
  ctx.body = await raceService.getAll();
  ctx.status = 200;
};
getAllRaces.validationScheme = null;

const getRaceById = async (ctx) => {
  ctx.body = await raceService.getById(parseInt(ctx.params.id));
  ctx.status = 200;
};
getRaceById.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive(),
  })
};

const createRace = async (ctx) => {
  const newRace = await raceService.create(ctx.request.body);
  ctx.body = newRace;
  ctx.status = 201;
};
createRace.validationScheme = {
  body: Joi.object({
    start: Joi.date(),
    name: Joi.string().max(255),
    isSprint: Joi.boolean(),
    circuitId: Joi.number().integer().positive(),
  })
};

const updateRace = async (ctx) => {
  const updatedRace = await raceService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = updatedRace;
  ctx.status = 200;
};
updateRace.validationScheme = {
  params: Joi.object({
    id: Joi.number().integer().positive()
  }),
  body: Joi.object({
    start: Joi.date(),
    name: Joi.string().max(255),
    isSprint: Joi.boolean(),
    circuitId: Joi.number().integer().positive(),
  })
};

const deleteRaceById = async (ctx) => {
  ctx.body = await raceService.deleteById(parseInt(ctx.params.id));
  ctx.status = 204;
};
deleteRaceById.validationScheme = {
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
  router.post('/', hasPermission(permissions.write), validate(createRace.validationScheme), createRace);
  router.put('/:id', hasPermission(permissions.change), validate(updateRace.validationScheme), updateRace);
  router.delete('/:id', hasPermission(permissions.delete), validate(deleteRaceById.validationScheme), deleteRaceById);

  app.use(router.routes()).use(router.allowedMethods());
};
