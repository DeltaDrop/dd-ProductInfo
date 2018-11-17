var express = require('express');
var parser = require('body-parser');
var {db, knex, Product} = require('../db/index.js');
var path = require('path');

let app = express();
app.use(parser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

    // ORIGINAL

    
// app.get('/api/:prod_name', (req, res) => {
//   let prod_name = req.params.prod_name;
//   let q = `select name, price, sale_price, number_of_reviews, average_score, unix_timestamp(deal_ends) as time, units_sold, shipping_option, drop_count 
//   from items where items.name = '${prod_name}'`
//   db.connection.query(q, (err, results) => {
//     if (err) {
//       if (err.message === '404') res.status(404).send(err);
//       else res.sendStatus(500);
//     }
//     else res.send(results);
//   })
// })

// app.get('/api/categories/:prod_name', (req, res) => {
//   let prod_name = req.params.prod_name;
//   let q = `select c.name from categories c inner join items_categories ic on (c.category_id = ic.catID)
//           inner join items i on (ic.itemID = i.item_id) where i.name = '${prod_name}'`
//   db.connection.query(q, (err, results) => {
//     if (err) {
//       if (err.message === '404') res.status(404).send(err);
//       else res.sendStatus(500);
//     }
//     else res.send(results);
//   })
// })

// app.post('/api/drop', (req, res) => {
//   var prod_name = req.body.name;
//   var count = req.body.drop_count + 1;
//   if (count % 5 === 0) {
//     var oldPrice = req.body.sale_price || req.body.price;
//     var newPrice = oldPrice * .9;
//     var q = `update items set drop_count = ${count},
//             price = ${oldPrice},
//             sale_price = ${newPrice}
//             where name = '${prod_name}'`
//   } else {
//     var q = `update items set drop_count = ${count} where name = '${prod_name}'`
//   }
  
//   db.connection.query(q, (err) => {
//     if (err) {
//       if (err.message === '404') res.status(404).send(err);
//       else res.sendStatus(500);
//     }
//     else res.sendStatus(201);
//   })
// })

app.get('/api/:prod_name', (req, res) => {
  let prod_name = req.params.prod_name;
  knex.select('name', 'price', 'sale_price', 'average_score', 'deal_ends', 'units_sold', 'shipping_option', 'drop_count').from('items').where({'name' : prod_name.toString()}).limit(1)
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => console.log(err, 'error in get api prod name'))
})

app.get('/api/categories/:prod_name', (req, res) => {
  let prod_name = req.params.prod_name;
  knex.select('category').from('items').where({'name' : prod_name.toString()}).limit(1)
  .then(results => {
    res.status(200).send(results);
  })
  .catch(err => {
    console.log(err, "error in get api categories") 
    err.message === '404' ? res.status(404).send(err) : res.status(500).send(err)
  })
})

app.post('/api/drop', (req, res) => {
  var prod_name = req.body.name;
  var count = req.body.drop_count + 1;
  var id = req.body.id;
  if (count % 5 === 0) {
    var oldPrice = req.body.sale_price || req.body.price;
    var newPrice = oldPrice * .9;
    knex('items').where({
      'id' : id,
      'name' : prod_name,
    })
    .update({
      'drop_count' : count,
      'price' : oldPrice,
      'sale_price' : newPrice,
    })
    .then(results => res.status(201).send())
    .catch(err => {
      console.log(err, "error in updating drop count by 5")
    })
  } else {
    knex('items').where({
      'id' : id,
      'name' : prod_name
    }).update({'drop_count' : count})
    .then(results => res.status(201).send())
    .catch(err => {
      console.log(err, "error in updating drop count")
    })
  }
})

app.get('/buy/*', (req, res) => {
  res.sendFile(path.resolve('react-client/dist/index.html'));
})

let port = 3001;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})