const productModel = require("../models/product_model");

const productController = {
  get: async (req, res) => {
    const {
      search,
      filter,
      category,
      product_name,
      sortBy,
      page = 1,
      limit = 12,
    } = req.query;
    const offset = (page - 1) * limit;

    try {
      const progress = await productModel
        .get(search, filter, category, product_name, sortBy, limit, offset)
        .then((result) => {
          res.status(200).json({
            message: "success",
            data: result,
            page,
            limit,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });

      return progress;
    } catch (error) {
      return error;
    }
  },

  getDetail: async (req, res) => {
    const progress = await productModel
      .getDetail(req.params.product_id)
      .then((result) => {
        res.status(200).send({ message: "success", data: result });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });

    return progress;
  },

  add: async (req, res) => {
    const request = {
      ...req.body,
    };
    const progress = await productModel
      .add(request)
      .then((result) => {
        res.status(201).send({ message: "success", data: result });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
    return progress;
  },
};

module.exports = productController;
