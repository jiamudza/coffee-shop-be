const express = require('express')
const route = express()

const cartController = require('../controllers/cart_controller')

route.get('/', cartController.get)
route.post('/:user_id', cartController.add)
route.delete('/:cart_id', cartController.delete)
route.get('/:user_id', cartController.getByUser)

module.exports = route