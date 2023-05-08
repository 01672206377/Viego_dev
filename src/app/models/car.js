const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

// Tạo schema cho xe
const CarSchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
}, {
  timestamps: true
});

CarSchema.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true
})
// Tạo model cho xe
const Car = mongoose.model('Car', CarSchema);

module.exports = Car;