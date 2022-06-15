const asyncMiddleware = require('../middleware/async')
const Post = require('../models/Post')
const {User, validate } = require('../models/User')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class SiteController{

    // [GET] /
    async index(req, res, next) {
        // try{
        //     const user = await User.findById(req.user._id)
        // }
        // catch(ex){
        //     next(ex)
        // }
        const user = await User.findById(req.user._id)
        Post.find({})
            .then(posts => {
                res.render('home', { 
                    posts: multipleMongooseToObject(posts),
                    user: mongooseToObject(user)
                 })
            })
            .catch(next);
    }
    // [GET] /search
    search(req, res){
        res.render('search')
    }
}

module.exports = new SiteController;
