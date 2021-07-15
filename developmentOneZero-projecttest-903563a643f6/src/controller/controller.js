// Arquivo que contém métodos e rotas

const schema = require('../schema/schema')

const Router = require('koa-router')
var controller = new Router()

controller.get('/users', async (ctx) => { // Criando método get e rota /users
  try {
    const users = await schema.find({}, "nome email idade")
    ctx.body = `olá ${users}`
  } catch (error) {
    console.log(error)
  }
})
.post('/create', async (ctx) => { // Recebendo erro -> TypeError: Cannot destructure property 'nome' of 'ctx.body' as it is undefined.
  try {
    const { nome, email, idade } = ctx.body
    console.log(`O usuário ${nome} foi adicionado ao banco de dados`)
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

module.exports = controller;