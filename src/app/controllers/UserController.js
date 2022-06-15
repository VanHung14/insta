let express = require('express');
let cookieParser = require('cookie-parser');
let app = express()
app.use(cookieParser());
const Joi = require('joi')
const bcrypt = require('bcrypt')
const {User, validate} = require('../models/User')



class UserController{

    // [POST] /users/auth  // login-processing
    async auth(req, res) {
        const { error }  = auth(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    
        let user = await User.findOne({ email: req.body.email})
        if(!user) return res.status(400).send('Invalid email or password')
    
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send('Invalid email or password')

        const token = user.generateAuthToken()
        res.cookie("token", token)
        // console.log(token)
        // res.send(token)
        // localStorage.setItem('token', token);
        // res.header('x-auth-token', token).send(user)
        res.header('x-auth-token', token).redirect('/')
        // res.header('x-auth-token', token).render('home')

    }
    // Information Export Principle

    // [POST] /users
    async register(req, res) {
        const { error }   = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    
        let user = await User.findOne({ email: req.body.email})
        if(user) return res.status(400).send('User already registered')
    
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save() 
    
        const token = user.generateAuthToken()
        // const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'))

        res.header('x-auth-token', token).send(user)
        // res.header('x-auth-token', token).render('login')
    }
}

function auth(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    } 
    return Joi.validate(req,schema)
}

module.exports = new UserController;