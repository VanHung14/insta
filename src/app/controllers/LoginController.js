const User = require('../models/User')
// const { multipleMongooseToObject } = require('../../util/mongoose')

class LoginController{

    login(req, res, next){
        res.render('login')
    }
    register(req, res, next){
        res.render('register')
    }
}

module.exports = new LoginController;
