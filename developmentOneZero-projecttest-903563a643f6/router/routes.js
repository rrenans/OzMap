const userController = require('../src/controller/userController')

const Router = require('koa-router');

var router = new Router();

router.get('/users', async (ctx) => {
  ctx.status = 200;
  ctx.body = {total:0, count: 0, rows:[]}
});

router.post('/user', userController.create())

module.exports = router;