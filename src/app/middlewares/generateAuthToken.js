
const Token = require('../models/token')
const jwt = require('jsonwebtoken')

const generateAuthToken = async (user, role) => {
    let expiresIn = '1h'
    if(role === 'admin'){
      expiresIn = '30d';
    }
    const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn });
    const tokenDoc = new Token({ token, userId: user._id });
    await tokenDoc.save();
    return token;
  };

  module.exports = generateAuthToken