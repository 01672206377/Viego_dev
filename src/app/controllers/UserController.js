class UserController{

    index(req, res, next){
        res.send('DETAIL USERS!!!')
    }
}

module.exports = new UserController