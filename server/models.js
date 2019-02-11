const db = require('../db/index.js');

module.exports = {
  item: {
    get: function(prod_name, callback) {
      let q = `select name, price, sale_price, number_of_reviews, average_score, unix_timestamp(deal_ends) as time, units_sold, shipping_option, drop_count from items where items.name = '${prod_name}'`;
      db.connection.query(q, (err, results) => {
        callback(err, results);
      })
    }
  },

  categories: {
    get: function(prod_name, callback) {
      let q = `select c.name from categories c inner join items_categories ic on (c.category_id = ic.catID) inner join items i on (ic.itemID = i.item_id) where i.name = '${prod_name}'`;
      db.connection.query(q, (err, results) => {
        callback(err, results);
      })
    }
  },

  drop: {
    post: function(info, callback) {
      let prod_name = info.name;
      let count = info.drop_count + 1;
      let q;

      if (count % 5 === 0) {
        let oldPrice = info.sale_price || info.price;
        let newPrice = oldPrice * .9;
        q = `update items set drop_count = ${count}, price = ${oldPrice}, sale_price = ${newPrice} where name = '${prod_name}'`;
      }
      else {
        q = `update items set drop_count = ${count} where name = '${prod_name}'`;
      }

      db.connection.query(q, (err) => {
        callback(err);
      })
    }
  }
}
