const Router = require('koa-router')
var teste = new Router()

const schema = require('../schema/schema')

// Resolvendo os testes
teste
.get('/users', async (ctx) => {
  ctx.status = 200;
  ctx.body = {total:0, count: 0, rows:[]}
})
.post('/user', async (ctx) => {
  const nome = 'raupp'
  const email = 'jose.raupp@devoz.com.br'
  const idade = 35
  ctx.status = 201
  await schema.create({
    nome,
    email,
    idade
  })
})
.get('/user/naoExiste', async (ctx) =>{
  const userNull = await schema.find({}, "userNull")
  if (userNull){
    ctx.status = 404
  }
})
.get('/user/raupp', async (ctx) => {
  const users = await schema.find({}, "nome email idade")
  ctx.body = users
  ctx.status = 200
})
.delete('/user/raupp', async (ctx) => {
  const {nome} = "raupp"
  await schema.deleteOne({ nome: nome })
  ctx.status = 200
})
.get('/users', async (ctx) => {
  ctx.body = {total:5}
})


module.exports = teste;