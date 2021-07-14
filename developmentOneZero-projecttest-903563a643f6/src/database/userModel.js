const Sequelize = require('sequelize')

class UserModel {
  static init(sequelize) {
    super.init({
      "iduser": {type: Sequelize.SMALLINT, primarykey: true},
      "nome": Sequelize.STRING,
      "email": Sequelize.STRING,
      "idade": Sequelize.INTEGER
    }, {
      sequelize,
      freezeTableName: true,
      tableName: "user",
      timestamps: false,
      underscored: true
    })
  }
}

module.exports = UserModel;