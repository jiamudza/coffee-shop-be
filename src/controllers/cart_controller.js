const cartModel = require("../models/cart_model");

const cartController = {
  get: async (req, res) => {
    try {
      const progress = await cartModel
        .get()
        .then((result) => {
          res.status(200).send({ message: "success", data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });

      return progress;
    } catch (error) {
      return err;
    }
  },

  getByUser: async (req, res) => {
    try {
      const progress = await cartModel
        .getByUser(req.params.user_id)
        .then((result) => {
          res.status(200).send({
            message: "success",
            data: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err,
          });
        });

      return progress;
    } catch (error) {
      return error;
    }
  },

  add: async (req, res) => {
    const request = {
      ...req.body,
      user_id: req.params.user_id,
    };
    try {
      const progress = await cartModel
        .add(request)
        .then((result) => {
          res.status(201).send({ message: "success", data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
      progress;
    } catch (error) {
      return error;
    }
  },

  delete: async (req, res) => {
    try {
      const progress = await cartModel
        .delete(req.params.cart_id)
        .then((result) => {
          res.status(201).send({ message: "success", data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });

      return progress;
    } catch (error) {
      return error;
    }
  },

  deleteByUser: async (req, res) => {
    try {
      const progress = await cartModel
        .deleteByUser(req.params.user_id)
        .then((result) => {
          res.status(201).send({ message: "success", data: result });
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });

        return progress
    } catch (error) {
        return error
    }
  },
};

module.exports = cartController;
