const User = require('../../models/user')
const Token = require('../../models/token')
const auth = require('../../middlewares/auth')
const generateAuthToken = require('../../middlewares/generateAuthToken')
const bcrypt = require('bcryptjs')

class AuthController{

    // [GET] /auth/register
    getRegister(req, res){
        res.render('auth/register')
    }

    // [POST] /auth/postRegister
    async registerHandle(req, res, next){
        const { name, email, password, role} = req.body;
        console.log({ name, email, password})
        try {
            const existingUser  = await User.findOne({ email });
            if(existingUser){
                return res.render('auth/register', {msg : 'Email already exists'})
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({name, email, password: hashedPassword, role})
            await user.save()

            const token = await generateAuthToken(user);

            res.cookie('token', token, {httpOnly: true})
            res.render('auth/login')

        } catch (error) {
            console.log(error)
            res.status(400).send(error.message);
        }
    }

    // [GET] /auth/login
    getLogin(req, res){
        res.render('auth/login')
    }

    // [POST] /auth/postLogin
    async postLogin(req, res, next){
        try {
            const {email, password} = req.body;
            const existingUser = await User.findOne({ email })
            if(!existingUser){
                return res.status(401).send('Email or password is incorrect');
            }

            const isMatch = await bcrypt.compare(password, existingUser.password);

            if(!isMatch){
                return res.status(401).send('Email or password is incorrect');
            }

            const token = await generateAuthToken(existingUser, existingUser.role);

            res.cookie('token', token, {httpOnly: true});

            res.locals.user = existingUser;
            
            if (existingUser.role === 'admin') {
                res.render('admin/dash', { user: existingUser });
            } else if (existingUser.role === 'user') {
            res.render('user/dash', { user: existingUser });
            } else if (existingUser.role === 'provider') {
            res.render('provider_view', { user: existingUser });
            }
              
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message);
        }
    }
}

module.exports = new AuthController