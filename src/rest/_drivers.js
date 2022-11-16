const Router = require('@koa/router');
const driverService = require('../service/drivers');

const getAllDrivers = async (ctx) => {
  ctx.body = await driverService.getAll()
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/drivers',
  });

  router.get('/', getAllDrivers);
  // router.put('/:id', updatePlace);

  app.use(router.routes()).use(router.allowedMethods());
};