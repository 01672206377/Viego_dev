
const auth = require('../app/middlewares/auth')
const siteRouter = require('./site')
const authRouter = require('./auth/auth')
const adminRouter = require('./admin')
const userRouter = require('./user')

function route(app){
    app.use('/auth', authRouter)
    app.use('/admin',auth,  adminRouter)
    app.use('/user',auth,  userRouter)
    app.use('/', siteRouter)
}

module.exports = route