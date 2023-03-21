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

  add: (req, res) => {
    const request = {
      ...req.body,
    }

    return productModel
      .add(request)
      .then((result) => {
        console.log(req)
        res.status(201).send({ message: "success", data: result });
      })
      .catch((err) => {
        res.status(500).send({ message: err });
      });
  },

  update : async(req, res) => {

    try {
      const request = {
        ...req.body,
        product_id: req.params.product_id,
        product_image: req.file.path
      }
      console.log(req.file)
      const progress = await productModel.update(request)
      .then(result => {
        res.status(201).send({
          message: 'success',
          data: result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message: err
        })
      })
      return progress
    } catch (error) {
      return error
    }
  },

  delete : async(req, res) => {
    try {
      const progress = await productModel.delete(req.params.product_id)
      .then(result => {
        res.status(200).send({message: 'success', data: result})
      })
      .catch(err => {
        res.status(500).send({message: err})
      })
    } catch (error) {
      return err
    }
  }
};

module.exports = productController;
