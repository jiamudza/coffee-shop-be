const { v4: uuidv4 } = require("uuid");
const db = require("../../helper/connection");

const cartModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`select * from cart`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },

  getByUser: ({ user_id, cart_id }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select product.product_name, product.product_image, product.price, cart.amount, size.size, users.delivery_address from cart 
    left join users 
    on cart.user_id = '${user_id}'
    left join product
    on cart.product_id = product.product_id
    left join size
    on cart.id_size = size.size_id`,
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

  add: ({ cart_id, user_id, product_id, id_size, price, amount, total }) => {
    return new Promise((resolve, reject) => {
        total = amount * price
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

  delete : ({user_id, cart_id}) => {
    return  new Promise((resolve, reject) => {
        db.query(`delete from cart where user_id = '${user_id}' and cart_id = '${cart_id}'`, (err, result) => {
            if(err) {
                return reject(err.message)
            } else {
                return resolve(result.rows[0])
            }
        })
    })
  }
};

module.exports = cartModel;
