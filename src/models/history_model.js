const { v4: uuidv4 } = require("uuid");
const db = require("../../helper/connection");

const historyModel = {
  query: (search, created_at, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY created_at ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!search && !created_at) {
      return orderQuery;
    } else if (search && created_at) {
      return `WHERE created_at LIKE '%${search}%' AND created_at LIKE '${created_at}%' ${orderQuery}`;
    } else if (search || created_at) {
      return `WHERE created_at LIKE '%${search}%' OR created_at LIKE '${created_at}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: (search, created_at, sortBy = "desc", limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from history ${historyModel.query(
          search,
          created_at,
          sortBy,
          limit,
          offset
        )}`,
        (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(result.rows);
          }
        }
      );
    });
  },

  queryDetail: (history_id) => {
    let history = `and history_id = '${history_id}'`;

    if (!history_id) {
      return ` `;
    } else {
      return history;
    }
  },

  getByUser: (user_id, history_id, limit, offset) => {
    console.log(history_id);
    return new Promise((resolve, reject) => {
      db.query(
        `select product.product_name, product.product_image, product.price,  users.delivery_address, history.history_id, history.user_id, history.amount from history
        left join users 
        on history.user_id = users.user_id
        left join product
        on history.product_id = product.product_id
        where history.user_id = '${user_id}' ${historyModel.queryDetail(
          history_id
        )} limit ${limit} offset ${offset}`,
        (err, result) => {
          console.log({
            user_id,
            history_id,
            limit,
            offset,
          });
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },

  add: ({
    history_id,
    user_id,
    product_id,
    amount,
    price,
    total,
    created_at,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into history (history_id, user_id, product_id, amount, price, total, created_at) values ($1, $2, $3, $4, $5, $6, $7)`,
        [
          uuidv4(),
          user_id,
          product_id,
          amount,
          price,
          parseInt(amount) * parseInt(price),
          new Date(),
        ],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({
              history_id,
              user_id,
              product_id,
              amount,
              price,
              total,
              created_at,
            });
          }
        }
      );
    });
  },

  delete: (history_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from history where history_id = '${history_id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(`Data with id ${history_id} is deleted`);
          }
        }
      );
    });
  },
};

module.exports = historyModel;
