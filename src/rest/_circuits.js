const Router = require('@koa/router');
const circuitService = require('../service/circuits');

const getAllCircuits = async (ctx) => {
  ctx.body = await circuitService.getAll()
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/circuits',
  });

  router.get('/', getAllCircuits);
  // router.put('/:id', updatePlace);

  app.use(router.routes()).use(router.allowedMethods());
};