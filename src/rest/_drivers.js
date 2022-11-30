const Router = require('@koa/router');

const driverService = require('../service/drivers');

const getAllDrivers = async (ctx) => {
  ctx.body = await driverService.getAll();
  ctx.status = 200;
};

const getDriverById = async (ctx) => {
  ctx.body = await driverService.getById(parseInt(ctx.params.id));
};

const deleteDriverById = async (ctx) => {
  ctx.body = await driverService.deleteByiD(parseInt(ctx.params.id));
  ctx.status = 204;
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/drivers',
  });

  router.get('/', getAllDrivers);
  router.get('/:id', getDriverById);
  router.delete('/:id', deleteDriverById);

  app.use(router.routes()).use(router.allowedMethods());
};
