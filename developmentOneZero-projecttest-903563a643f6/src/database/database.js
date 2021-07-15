// Arquivo que conecta no banco de dados

// Importando mongoose, dependência para Mongo
const mongoose = require('mongoose')

// Criando conexão e pegando sua url
const db = mongoose.connection;
const url = "localhost:27017/ozmap";

// Classe com um construtor que retorna função que realiza a conexão
class Database {
    constructor() {
        this.mongo();
    }
    mongo() {
        this.mongoConnection = mongoose.connect(
            `mongodb://${url}`, 
            {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true
            }
        );
        this.handleConnect();
    }

    // Função que trata conecão do Mongoose 
    handleConnect() {
        db.on('connected', () => {
            console.log(`Mongoose default connection is open on ${url}`); 
        });

        db.on('error', err => {
            console.log(`Mongoose default connection has occured \n${err}`);
        });

        db.on('disconnected', () => {
            console.log(`Mongoose default connection is disconnected for ${url}`);
        });

        process.on('SIGINT', () => {
            db.close(() => {
                console.log(
                    'Mongoose default connection is disconnected due to application termination'
                );
                process.exit(0);
            });
        });
    }
}

module.exports = new Database;