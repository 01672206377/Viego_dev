const User = require('../models/user');
const Car = require('../models/car');
const path = require('path');
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

class UserController {
  index(req, res, next) {
    res.render('user/dash')
  }

  detail(req, res, next) {
    User.findById({ _id: req.user.id })
            .then(user => res.render('user/detail',{
                user: mongooseToObject(user)
            }))
            .catch(next)
  }

  addProfile(req, res, next) {
    const detailUser = req.body;
    const avatar = req.file;
    User.findOneAndUpdate(
      { _id: req.user.id }, // Điều kiện truy vấn, ví dụ: dựa trên id người dùng
      {
        fullname: detailUser.fullname,
        phone: detailUser.phone,
        location: detailUser.location,
        dob: detailUser.dob,
        avatar: avatar.filename
      },
      { new: true }
    )
      .then(updatedUser => {
        res.redirect('/user/profile');
      })
      .catch(next);
  }
  

  profile(req, res, next) {
    User.findOne({ _id: req.user.id })
        .then(user => res.render('user/profile', {
            user : mongooseToObject(user),
        }))
        .catch(next)
  }

  store(req, res, next){
    Car.find({})
      .then(cars => res.render('user/store', {
          cars : mutipleMongooseToObject(cars)
      }))
      .catch(next)
  }
}

module.exports = new UserController();
