var express = require('express');
var parser = require('body-parser');
var db = require('../db/index.js');
var path = require('path');
var router = require('./routes');

let app = express();
app.use(parser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use('/', router);

app.get('/api/:prod_name', (req, res) => {
  let prod_name = req.params.prod_name;
  let q = `select name, price, sale_price, number_of_reviews, average_score, unix_timestamp(deal_ends) as time, units_sold, shipping_option, drop_count 
  from items where items.name = '${prod_name}'`
  db.connection.query(q, (err, results) => {
    if (err) {
      if (err.message === '404') res.status(404).send(err);
      else res.sendStatus(500);
    }
    else res.send(results);
  })
})

app.get('/api/categories/:prod_name', (req, res) => {
  let prod_name = req.params.prod_name;
  let q = `select c.name from categories c inner join items_categories ic on (c.category_id = ic.catID)
          inner join items i on (ic.itemID = i.item_id) where i.name = '${prod_name}'`
  db.connection.query(q, (err, results) => {
    if (err) {
      if (err.message === '404') res.status(404).send(err);
      else res.sendStatus(500);
    }
    else res.send(results);
  })
})

app.post('/api/drop', (req, res) => {
  var prod_name = req.body.name;
  var count = req.body.drop_count + 1;
  if (count % 5 === 0) {
    var oldPrice = req.body.sale_price || req.body.price;
    var newPrice = oldPrice * .9;
    var q = `update items set drop_count = ${count},
            price = ${oldPrice},
            sale_price = ${newPrice}
            where name = '${prod_name}'`
  } else {
    var q = `update items set drop_count = ${count} where name = '${prod_name}'`
  }
  
  db.connection.query(q, (err) => {
    if (err) {
      if (err.message === '404') res.status(404).send(err);
      else res.sendStatus(500);
    }
    else res.sendStatus(201);
  })
})

app.get('/buy/*', (req, res) => {
  res.sendFile(path.resolve('react-client/dist/index.html'));
})

let port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})