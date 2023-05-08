const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user','provider', 'admin'],
    default: 'user'
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  fullname:{
    type:String
  },
  location:{
    type:String
  },
  phone:{
    type:String
  },
  dob:{
    type:Date
  },
  avatar:{
    type:String
  }
}, { timestamps: true });

userSchema.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;
