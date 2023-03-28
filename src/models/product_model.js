const { v4: uuidv4 } = require("uuid");
const db = require("../../helper/connection");

const productModel = {
  query: function (
    search,
    filter,
    category,
    product_name,
    sortBy,
    limit,
    offset
  ) {
    let orderQuery = `ORDER BY product_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if ((!search && !product_name) && (!filter && !category)) {
      return orderQuery;
    } else if (search && product_name) {
      return `WHERE lower(product_name) LIKE '%${search}%' AND lower(product_name) LIKE '%${product_name}%' ${orderQuery}`;
    } else if (search || product_name) {
      return `WHERE lower(product_name) LIKE '%${search}%' OR lower(product_name) LIKE '%${product_name}%' ${orderQuery}`;
    } else if (filter && category) {
      return `WHERE category LIKE '${filter}%' AND category LIKE '${category}%' ${orderQuery}`;
    } else if (filter || category) {
      return `WHERE category LIKE '${filter}%' OR category LIKE '${category}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: (
    search,
    filter,
    category,
    product_name,
    sortBy = "ASC",
    limit = 20,
    offset
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM product ${productModel.query(
          search,
          filter,
          category,
          product_name,
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

  getDetail: (product_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM product where product_id = '${product_id}'`,
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

  add: ({
    product_id,
    product_name,
    product_image,
    price,
    description,
    category,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from product`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `INSERT INTO product (product_id, product_name, product_image, price, description, category) VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              uuidv4(),
              product_name,
              product_image,
              price,
              description,
              category,
            ],
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve(
                  {product_id,
                  product_name,
                  product_image,
                  price,
                  description,
                  category}
                );
              }
            }
          );
        }
      });
    });
  },

  update: ({ product_id, product_name, product_image, price, description }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from product where product_id = '${product_id}'`,
        (err, result) => {
          if (err) {
            console.log(err);
            return reject(err.message);
          } else {
            db.query(
              `UPDATE product SET product_name ='${
                product_name || result.rows[0].product_name
              }', product_image ='${
                product_image || result.rows[0].product_image
              }', price ='${price || result.rows[0].price}', description ='${
                description || result.rows[0].description
              }' WHERE product_id='${product_id}'`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  return reject(err);
                } else {
                  return resolve({
                    product_id,
                    product_image,
                    product_name,
                    price,
                    description,
                  });
                }
              }
            );
          }
        }
      );
    });
  },

  delete : (product_id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from product where product_id = '${product_id}'`, (err, result) => {
        if(err) {
          return reject(err.message)
        } else{
          return resolve(result.rows)
        }
      }) 
    })
  }
};

module.exports = productModel;
