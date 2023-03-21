const cartModel = require('../models/cart_model')

const cartController = {
    get: async(req, res) => {
        try {
            const progress = await cartModel.get()
            .then(result => {
                res.status(200).send({message: 'success', data: result})
            })
            .catch(err => {
                res.status(500).send({message: err})
            })

            return progress
        } catch (error) {
            return err
        }
    },

    getByUser: async(req, res) => {
        try {
            const progress = await cartModel.getByUser(req.params.user_id)
            .then(result => {
                res.status(200).send({
                    message: "success",
                    data: result
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err
                })
            })

            return progress
        } catch (error) {
            return error
        }
    },

    add: async(req, res) => {
        const request = {
            ...req.body,
            user_id: req.params.user_id,
        }
        try {
            const progress = await cartModel.add(request)
            .then(result => {
                res.status(201).send({message: 'success', data: result})
            })
            .catch(err => {
                res.status(500).send({message: err})
            })
            progress
        } catch (error) {
            return error
        }
    },

    delete : async(req, res) => {
        const request = {
            ...req.body,
            cart_id : req.params.cart_id,
            user_id : req.body.user_id
        }
        console.log(request)
        try {
            const progress = await cartModel.delete(request)
            .then(result => {
                res.status(201).send({message: 'success', data: result})
            })
            .catch(err => {
                res.status(500).send({message: err})
            })

            return progress
        } catch (error) {
            return error
        }
    }
}

module.exports = cartController