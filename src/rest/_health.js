const Router = require('@koa/router');
const config = require('config');

const packageJson = require('../../package.json')

const ping = async (ctx) => {
    ctx.body = {
        pong: true,
    };
}

const getVersion = (ctx) => {
    ctx.body = {
        env: config.get('env'),
        version: packageJson.version,

    }
}


module.exports = (app) => {
	const router = new Router({
		prefix: '/health',
	});

    router.get('/ping', ping)
    router.get('/version', getVersion)

	app.use(router.routes()).use(router.allowedMethods());
};