const Router = require('@koa/router');
const Joi = require('joi');

const { hasPermission, permissions } = require('../core/auth');
const circuitService = require('../service/circuits');

const validate = require('./_validation');

const getAllCircuits = async (ctx) => {
  ctx.body = await circuitService.getAll();
};

getAllCircuits.validationScheme = null;

module.exports = (app) => {
  const router = new Router({
    prefix: '/circuits',
  });

  router.get('/', hasPermission(permissions.read), validate(getAllCircuits.validationScheme), getAllCircuits);
  // router.put('/:id', updatePlace);

  app.use(router.routes()).use(router.allowedMethods());
};