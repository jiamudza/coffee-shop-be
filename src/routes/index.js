const express = require('express')
const router = express()

const userRoute = require('../routes/user_route')
const authRoute = require('../routes/auth_route')
const productRoute = require('../routes/product_route')

router.get('/', (req, res) => {
    res.send('Backend For Coffee Shop')
})

router.use('/users', userRoute)
router.use('/auth', authRoute)
router.use('/products', productRoute)

module.exports = router