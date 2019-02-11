const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/api/:prod_name', controllers.item.get);
router.get('/api/categories/:prod_name', controllers.categories.get);
router.post('/api/drop', controllers.drop.post);
router.get('/buy/*', controllers.buy);

module.exports = router;