const Router = require('@koa/router');
const placeService = require('../service/places');

const getAllPlace = async (ctx) => {
    ctx.body = placeService.getAll() 
}

const updatePlace = async (ctx) => {
    ctx.body = placeService.updateById(ctx.params.id, {
        ...ctx.request.body
    })
}


module.exports = (app) => {
	const router = new Router({
		prefix: '/places',
	});

	router.get('/', getAllPlace);
	router.put('/:id', updatePlace);

	app.use(router.routes()).use(router.allowedMethods());
};