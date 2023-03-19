const express = require('express');
const route = express()
const productController = require('../controllers/product_controller');

route.get('/', productController.get)
route.get('/:product_id', productController.getDetail)
route.post('/', productController.add)


module.exports = route