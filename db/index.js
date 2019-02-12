var db = require('mysql');
var pass = require('../config.js');

const connection = db.createConnection({
  user: 'root',
  password: `${pass.password}`,
  database: 'product_info'
});

module.exports.connection = connection;