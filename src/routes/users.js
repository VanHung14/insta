// const {User, validate} = require('../app/models/User')
const userController = require('../app/controllers/UserController')
// const mongoose = require('mongoose')
const express = require('express')
const route = express.Router()

route.post('/auth', userController.auth)
route.post('/', userController.register)


module.exports = route