const express = require('express');
const formUpload = require('../../helper/formData');
const route = express()

const productController = require('../controllers/product_controller');

route.get('/', productController.get)
route.get('/:product_id', productController.getDetail)
route.post('/', formUpload.single("product_image"), productController.add)
route.post('/', productController.add)
route.patch('/:product_id', formUpload.single("image") ,productController.update)
route.patch('/:product_id', productController.update)
route.delete('/:product_id', productController.delete)


module.exports = route