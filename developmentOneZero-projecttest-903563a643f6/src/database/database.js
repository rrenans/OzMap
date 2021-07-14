const sequelize = require('sequelize')
const UserModel = require('./userModel')

class Database {
  constructor() {
    this.mysql()
  }
  mysql() {
    this.connection = new sequelize()
    UserModel.init(this.connection)
  }
}

module.exports = Database;