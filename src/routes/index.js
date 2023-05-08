
const auth = require('../app/middlewares/auth')
const siteRouter = require('./site')
const authRouter = require('./auth/auth')
const adminRouter = require('./admin')
const providerRouter = require('./provider')
const userRouter = require('./user')

function route(app){
    app.use('/auth', authRouter)
    app.use('/admin',auth,  adminRouter)
    app.use('/service',auth,  providerRouter)
    app.use('/user',auth,  userRouter)
    app.use('/', siteRouter)
}

module.exports = route