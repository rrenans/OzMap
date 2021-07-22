// Arquivo que contém métodos e rotas

// Importação do Schema
const schema = require('../schema/schema')

// Importação do koa-router, dependência para a criação das rotas
const Router = require('koa-router')
var controller = new Router()


// Métodos das rotas
controller
.get('/get-users', async (ctx) => { 
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
    if(nome === null || email === null || idade === null){
      ctx.body = 'Crie seu usuário de forma válida.'
    } if (nome === undefined || email === undefined || idade === undefined){
      ctx.body = 'Crie seu usuário de forma válida.'
    } if(nome === "" || email === "" || idade === ""){
      ctx.body = 'Crie seu usuário de forma válida'
    }if (idade < 18){
      ctx.body = 'Tem que ser maior de idade'
    } else{
      await schema.create(
        {
          nome,
          email,
          idade
        }
      )
      ctx.body = `O usuário ${nome} foi adicionado ao banco de dados`
    }
  } catch (error) {
    console.log(error)
  }
})
.delete('/del-users/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    if(id === null || id === undefined){
      ctx.body = 'Id não suportado'
    } else {
      ctx.body = `${id} foi apagado do banco de dados`
      await schema.deleteOne({ _id: id })
    }
  } catch (error) {
    console.log(error)
  }
})
/*
.delete('/del-users/:id', async ctx => {
  await schema.deleteOne({
   _id: ctx.params.id
  })
  .then(() => {
    ctx.body = { status: 'Task Deleted!' }
  })
  .catch(err => {
    ctx.body = 'error: ' + err
  })
})
*/
.put('/upd-users/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    const { nome, email, idade } = ctx.request.body;
    await schema.findByIdAndUpdate({_id: id}, {nome, email, idade}, {new: true})
    console.log(`O usuário com id: ${id} foi alterado para ${nome}, ${email}, ${idade}`)    
    ctx.body = `O usuário com id: ${id} foi alterado para ${nome}, ${email}, ${idade}`
  } catch (error) {
    console.log(error)
  }
})



// Rotas para resolução dos testes
.get('/users', async (ctx) => {
  ctx.status = 200;
  ctx.body = {total:5, count: 0, rows:[]}
})
.post('/user', async (ctx) => {
  for(i=0; i < 5; i++){
    const nome = 'raupp'
    const email = 'jose.raupp@devoz.com.br'
    const idade = 35
    ctx.status = 201
    await schema.create({
      nome,
      email,
      idade
    })
  }
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

// Exportação do arquivo
module.exports = controller;