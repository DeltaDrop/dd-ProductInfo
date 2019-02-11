const path = require('path');
const models = require('./models.js');

module.exports = {
  item: {
    get: function(req, res) {
      console.log('inside item get');
      console.log('item is: ', req.params.prod_name)
    }
  },

  categories: {
    get: function(req, res) {
      console.log('inside categories get');
    }
  },

  drop: {
    post: function(req, res) {
      console.log('inside drop post');
    }
  },

  buy: function(req, res) {
    res.sendFile(path.resolve('react-client/dist/index.html'));
  }
}