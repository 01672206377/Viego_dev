
const express = require('express')
const router = express.Router();

const ProviderController = require('../app/controllers/ProviderController')

router.get('/store', ProviderController.store);

router.get('/getCreate', ProviderController.getCreate)

router.post('/create', ProviderController.create)

router.get('/trash', ProviderController.trash)

router.get('/:id/getEdit', ProviderController.getEdit)

router.patch('/:id/restore', ProviderController.restore)

router.post('/:id', ProviderController.update)

router.delete('/:id', ProviderController.delete)

router.delete('/:id/force', ProviderController.destroy)

module.exports = router
