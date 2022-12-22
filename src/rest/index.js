const Router = require('@koa/router');

const installHealthRouter = require('./_health');
const installDriversRouter = require('./_drivers');
const installTeamsRouter = require('./_teams');
const installCircuitsRouter = require('./_circuits');
const installRacesRouter = require('./_races');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installHealthRouter(router);

  installDriversRouter(router);
  installTeamsRouter(router);
  installCircuitsRouter(router);
  installRacesRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
