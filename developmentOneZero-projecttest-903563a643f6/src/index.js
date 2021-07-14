//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router


const Koa = require('koa');
const koa = new Koa();
const router = require('../router/routes')

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

koa
  .use(router.routes())
  .use(router.allowedMethods());

const server = koa.listen(PORT);

module.exports = server;