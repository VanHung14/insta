const postsRouter = require('./posts')
const siteRouter = require('./site')
const meRouter = require('./me')
const usersRouter = require('./users')
const loginRouter = require('./login')
const registerRouter = require('./register')
const error = require('../app/middleware/error')
function route(app){

    app.use('/posts', postsRouter)
    app.use('/me', meRouter)
    app.use('/users', usersRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/', siteRouter)
    app.use(error)
    
}

module.exports = route;
