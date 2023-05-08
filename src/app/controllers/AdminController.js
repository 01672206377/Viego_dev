
const User = require('../models/user')
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

class AdminController{

    // [GET] /admin/getUser
    getUser(req, res, next){
        User.find({ name: { $ne: "Admin"}})
            .then(users => res.render('admin/manageUserInf', {
                users : mutipleMongooseToObject(users)
            }))
            .catch(next)
    }

    // [GET] /admin/:id/edit
    edit(req, res, next){
        User.findById(req.params.id)
            .then(user => res.render('admin/editUser',{
                user: mongooseToObject(user)
            }))
            .catch(next)
    }

    // [PUT] /admin/_id
    updateUser(req, res, next){
        User.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/userManage'))
            .catch(next)
    }

    // [DELETE] /admin/:id
    deleteUser(req, res, next){
        User.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /admin/:id/force
    deleteUserForce(req, res, next){
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /admin/trashUser
    trashUser(req, res, next){
        User.findDeleted({ name: { $ne: "Admin"}})
            .then(users => res.render("admin/trashUser", {
                users : mutipleMongooseToObject(users)
            }))
            .catch(next)
    }

    // [PATCH] /admin/:id/restoreUser
    restoreUser(req, res, next){
        User.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

}

module.exports = new AdminController