const userSchema = require('../schema/userSchema')

class userController {
  async create(req, res){
    const { nome, email, idade } = req.body;
    await userSchema.create(
      {
        nome,
        email,
        idade
      }
    ).catch(error => {
      console.log(error);
    });
    return res.json({nome, email, idade});
  }
}

module.exports = userController;