
const express = require('express')
const router = express.Router();

const AuthController = require('../../app/controllers/auth/AuthController')

router.get('/register', AuthController.getRegister)

router.post('/postRegister', AuthController.registerHandle)

router.get('/login', AuthController.getLogin)

router.post('/postLogin', AuthController.postLogin)

module.exports = router
