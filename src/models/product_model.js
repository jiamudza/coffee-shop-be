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

    if (!search && !product_name && !filter && !category) {
      return orderQuery;
    } else if (search && product_name) {
      return `WHERE product_name LIKE '%${search}%' AND product_name LIKE '${product_name}%' ${orderQuery}`;
    } else if (search || product_name) {
      return `WHERE product_name LIKE '%${search}%' OR product_name LIKE '${product_name}%' ${orderQuery}`;
    } else if (filter && category) {
      return `WHERE category[2] LIKE '%${filter}%' AND category[2] LIKE '${category}%' ${orderQuery}`;
    } else if (filter || category) {
      return `WHERE category[2] LIKE '%${filter}%' OR category[2] LIKE '${category}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: (
    search,
    filter,
    category = [],
    product_name,
    sortBy = "ASC",
    limit,
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
      db.query(
        `INSERT INTO product (product_id, product_name, product_image, price, description, category) VALUES ($1, $2, $3, $4, $5, $6)`,
        [uuidv4(), product_name, product_image, price, description, category],
        (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(
              product_id,
              product_name,
              product_image,
              price,
              description,
              category
            );
          }
        }
      );
    });
  },

  update: ({
    product_id,
    product_name,
    product_image,
    price,
    description,
    category,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE product SET display_name ='${
        product_name || result.rows[0].product_name
      }', product_image ='${product_image || result.rows[0].product_image}', price ='${
        price || result.rows[0].price
      }', description ='${
        description || result.rows[0].description
      }',  category ='${category || result.rows[0].category}' WHERE product_id='${product_id}'`, (err, result) => {
        
      })
    })
  }
};

module.exports = productModel;
