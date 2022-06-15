const {User, validate } = require('../models/User')
const Post = require('../models/Post')
const { mongooseToObject } = require('../../util/mongoose')

class PostController{

    // [GET] /posts/:slug
    async show(req, res, next){
        // const user = await User.findById(res.user._id)
        Post.findOne({ slug: req.params.slug }) 
            .then(post => {
                res.render('posts/show', {
                    post: mongooseToObject(post),
                    // user: mongooseToObject(user)
                })
            })
            .catch(next)    
    }

    // [GET] /posts/create
    create(req, res, next){
        res.render('posts/create')
    }
     // [POST] /posts/store
    store(req, res, next){
        // res.render('posts/create')
        
        const post = new Post(req.body)
        post.save()
            .then(() => res.redirect('/'))
            .catch(error =>{
                
            })
        // res.json(req.body)
    }
    // [GET] /posts/:id/edit
    edit(req, res, next){
        Post.findById(req.params.id)
            .then(post => res.render('posts/edit', {
                post: mongooseToObject(post)
            }))
            .catch(next)
        
    }
    // [PUT] /posts/:id
    update(req, res, next) {
        Post.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/posts'))
            .catch(next)
    }

    // [DELETE] /posts/:id
    delete(req, res, next){
        Post.deleteOne({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new PostController;
