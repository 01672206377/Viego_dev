
const Car = require('../models/car')
const generateAuthToken = require('../middlewares/generateAuthToken')
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')

class ProviderController{

    store(req, res, next){
        Car.find({})
            .then(cars => res.render('provider/store', {
                cars : mutipleMongooseToObject(cars)
            }))
            .catch(next)
    }

    getCreate(req, res, next){
        res.render('provider/create')
    }

    async create(req, res, next) {
        try {
          const car = new Car({
            ...req.body,
            userId: req.user._id // gán giá trị cho trường userId
          });
          await car.save();
          res.redirect('/service/store');
        } catch (err) {
          next(err);
        }
      }
    
    trash(req, res, next){
      Car.findDeleted({})
            .then(cars => res.render("provider/trash", {
                cars : mutipleMongooseToObject(cars)
            }))
            .catch(next)
    }

    getEdit(req, res, next){
      Car.findById(req.params.id)
            .then(car => res.render('provider/edit',{
                car: mongooseToObject(car)
            }))
            .catch(next)
    }

    update(req, res, next){
      Car.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/service/store'))
            .catch(next)
    }

    delete(req, res, next){
      Car.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    destroy(req, res, next){
      Car.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    restore(req, res, next){
      Car.restore({ _id: req.params.id })
          .then(() => res.redirect('back'))
          .catch(next)
  }
}

module.exports = new ProviderController