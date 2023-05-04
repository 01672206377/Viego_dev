const User = require('../models/user');
const Token = require('../models/token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function initApp() {
  try {
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const newAdmin = new User({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin',
      });
      const savedAdmin = await newAdmin.save();
      const token = jwt.sign({ _id: savedAdmin._id }, 'secret', { expiresIn: '1h' });
      const tokenDoc = new Token({ token, userId: savedAdmin._id });
      await tokenDoc.save();
      console.log('Admin account created with token:', token);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = { initApp };
