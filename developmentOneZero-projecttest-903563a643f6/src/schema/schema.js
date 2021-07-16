// Arquivo que faz integração com o Mongo

const mongoose = require('mongoose')

//Define o minimo de campos que o usuário deve ter.
const schema = new mongoose.Schema(
    {
        nome: { 
            type: String,
            required: true
        },
        email: { 
            type: String,
            required: true
        },
        idade: { 
            type: Number,
            required: true
        }
        /* title: "Schema do Usuario, define como é o usuario, linha 24 do teste",
        type: "object",
        required: ['nome', 'email', 'idade'],
        properties: {
            nome: {
                type: 'string'
            },
            email: {
                type: 'string'
            },
            idade: {
                type: 'number',
                minimum: 18
            }
        }*/
    },
    {
        timestamps: true
    }
)

// module.exports = userSchema;
module.exports = mongoose.model('users', schema)