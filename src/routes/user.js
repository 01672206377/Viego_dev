
const express = require('express')
const router = express.Router();
const upload = require('../app/middlewares/upload')

const UserController = require('../app/controllers/UserController');

router.get('/', UserController.index)

router.get('/store', UserController.store)

router.get('/detail', UserController.detail)

router.post('/addProfile', upload.single('avatar'), UserController.addProfile)

router.get('/profile', UserController.profile)

module.exports = router
