const express = require('express')
const router = express()

const userRoute = require('../routes/user_route')
const authRoute = require('../routes/auth_route')
const productRoute = require('../routes/product_route')
const cartRoute = require('../routes/cart_route')

router.get('/', (req, res) => {
    res.send('Backend For Coffee Shop')
})

router.use('/users', userRoute)
router.use('/auth', authRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute)

module.exports = router