const express = require('express');
const parser = require('body-parser');
const router = require('./routes');

const app = express();
const port = 3001;

app.use(parser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use('/', router);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
})