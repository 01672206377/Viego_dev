
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Token = require('../models/token')

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, 'secret');
    const tokenDoc = await Token.findOne({ token, userId: decoded._id }); // sử dụng trường userId để tìm kiếm bản ghi token

    if (!tokenDoc) {
      throw new Error();
    }

    req.user = await User.findById(decoded._id);
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send('Please authenticate');
  }
};


  module.exports = auth