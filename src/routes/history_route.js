const express = require('express')
const route = express();

const historyController = require('../controllers/history_controller')

route.get('/', historyController.get)
route.get('/:user_id', historyController.getByUser)
route.post('/', historyController.add)
route.delete('/:history_id', historyController.delete)
route.delete('/user/:user_id', historyController.deleteByUser)


module.exports = route