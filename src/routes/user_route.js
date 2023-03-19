const express = require('express'); 
const formUpload = require('../../helper/formData');
const route = express()

const userController = require('../controllers/user_controller')

route.get('/', userController.get);
route.get('/:user_id', userController.getById)
route.delete('/:user_id', userController.deleteById)
route.patch('/:user_id', formUpload.single("image"), userController.update )
route.patch('/:user_id', userController.update)

module.exports = route  