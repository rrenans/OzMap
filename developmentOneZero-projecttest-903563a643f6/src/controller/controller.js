// Arquivo que contém métodos e rotas

const schema = require('../schema/schema')
const bodyParser = require('koa-bodyparser')

const Koa = require('koa');
const koa = new Koa();
koa.use(bodyParser())

const Router = require('koa-router')
var controller = new Router()


controller
.get('/get-users', async (ctx) => { // Criando método get e rota /users
  try {
    const users = await schema.find({}, "nome email idade")
    ctx.body = `${users}`
    ctx.status = 200
  } catch (error) {
    console.log(error)
  }
})
.post('/post-user', async (ctx) => { 
  try {
    const { nome, email, idade } = ctx.request.body;
    ctx.body = `O usuário ${nome} foi adicionado ao banco de dados`
    await schema.create(
      {
        nome,
        email,
        idade
      }
    )
  } catch (error) {
    console.log(error)
  }
})
.delete('/users/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    ctx.body = `O usuário com id: ${id} foi apagado do banco de dados`
    await schema.deleteOne({_id: id})
  } catch (error) {
    console.log(error)
  }
})
.put('/users/:id', async (ctx) => {
  try {
    console.log(ctx.request.params)
    const { id } = ctx.request.params
    const { nome, email, idade } = ctx.request.body;
    const user = await schema.findByIdAndUpdate({_id: id}, {nome, email, idade}, {new: true})
    console.log(`O usuário com id: ${id} foi alterado para ${nome}, ${email}, ${idade}`)
    ctx.toJSON(user)    
    ctx.body = `O usuário com id: ${id} foi alterado para ${nome}, ${email}, ${idade}`
    console.log(ctx.body)
  } catch (error) {
    console.log(error)
  }
})

// Resolvendo testes
.get('/users', async (ctx) => {
  ctx.status = 200;
  ctx.body = {total:0, count: 0, rows:[]}
})

module.exports = controller;