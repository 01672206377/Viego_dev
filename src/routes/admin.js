
const express = require('express')
const router = express.Router();

const AdminController = require('../app/controllers/AdminController');

router.get('/userManage', AdminController.getUser)

router.get('/:id/editUser', AdminController.edit)

router.put('/:id', AdminController.updateUser)

router.delete('/:id', AdminController.deleteUser)

router.delete('/:id/force', AdminController.deleteUserForce)

router.get('/trashUser', AdminController.trashUser)

router.patch('/:id/restoreUser', AdminController.restoreUser)

module.exports = router
