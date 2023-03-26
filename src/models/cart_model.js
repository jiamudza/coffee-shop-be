const { v4: uuidv4 } = require("uuid");
const db = require("../../helper/connection");

const cartModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`select * from cart`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  getByUser: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select cart.cart_id, users.display_name, product.product_id, product.product_name, product.product_image, cart.amount, cart.total, size.size, users.delivery_address from cart 
        left join users 
        on cart.user_id = users.user_id
        left join product
        on cart.product_id = product.product_id
        left join size
        on cart.id_size = size.size_id
    
        where users.user_id = '${user_id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },

  add: ({ cart_id, user_id, product_id, id_size, price, amount, total }) => {
    return new Promise((resolve, reject) => {
      total = amount * price;
      db.query(
        `insert into cart (cart_id, user_id, product_id, id_size, amount, price, total) values($1, $2, $3, $4, $5, $6, $7)`,
        [uuidv4(), user_id, product_id, id_size, amount, price, total],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({
              cart_id,
              user_id,
              product_id,
              id_size,
              price,
              amount,
              total,
            });
          }
        }
      );
    });
  },

  delete: (cart_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `delete from cart where cart_id = '${cart_id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },

  deleteByUser: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from cart where user_id = '${user_id}'`,
      (err, result) => {
        if(err) {
          return reject(err.message)
        } else {
          return resolve('data is deleted')
        }
      })
    })
  }
};

module.exports = cartModel;
