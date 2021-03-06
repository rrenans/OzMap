//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

const Koa = require('koa');
const koa = new Koa();

// const json = require('koa-json')
const bodyParser = require('koa-bodyparser')

// Importação das dependências que renderizam uma página no navegador
const path = require('path')
const render = require('koa-ejs')

// Require das rotas e métodos
const router = require('./controller/controller')

// Require do banco de dados
require('./database/database')

// require('./tests/test') Era para fazer a requisição dos testes, sem os mesmos terem que passar pelo controller

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

// Utilizando dependência que faz renderização
render(koa, {
  root: path.join(__dirname, 'pages'),
  layout: 'layout',
  viewExt: 'html',
  debug: false,
  cache: false
})

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  await ctx.render('index') //http://localhost:3000/
})

koa
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

const server = koa.listen(PORT);

module.exports = server;