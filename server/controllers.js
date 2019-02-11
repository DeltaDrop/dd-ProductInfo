const path = require('path');
const models = require('./models.js');

module.exports = {
  item: {
    get: function(req, res) {
      models.item.get(req.params.prod_name, (err, results) => {
        if (err) console.log('error in models item get: ', err);
        else res.send(results);
      })
    }
  },

  categories: {
    get: function(req, res) {
      models.categories.get(req.params.prod_name, (err, results) => {
        if (err) console.log('error in models categories get: ', err);
        else res.send(results);
      })
    }
  },

  drop: {
    post: function(req, res) {
      models.drop.post(req.body, (err) => {
        if (err) console.log('error in models drop post: ', err);
        else res.sendStatus(201);
      })
    }
  },

  buy: function(req, res) {
    res.sendFile(path.resolve('react-client/dist/index.html'));
  }
}