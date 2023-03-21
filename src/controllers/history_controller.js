const historyModel = require("../models/history_model");

const historyController = {
  get: async (req, res) => {
    const {
      search,
      created_at,
      sortBy = "DESC",
      page = 1,
      limit = 12,
    } = req.query;

    const offset = (page - 1) * limit;
    try {
      const progress = await historyModel
        .get(search, created_at, sortBy, limit, offset)
        .then((result) => {
          res.status(200).send({
            message: "success",
            data: result,
            page,
            limit,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ message: err });
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getByUser: async (req, res) => {
    const { page = 1, limit = 12, history_id } = req.query;
    const offset = (page - 1) * limit;
    try {
      const result = await historyModel.getByUser(
        req.params.user_id,
        history_id,
        limit,
        offset
      );

      return res.status(200).send({
        message: "success",
        data: result,
        page,
        limit,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error,
      });
    }
  },

  add: async (req, res) => {
    const request = {
      ...req.body,
    };
    try {
      const result = await historyModel.add(request);

      return res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (error) {
      return res.status(500).send({
        message: error,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const result = await historyModel
        .delete(req.params.history_id)
        .then((data) => {
          res.status(200).send({
            message: data,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err,
          });
        });

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = historyController;
