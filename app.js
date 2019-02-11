const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const { handle400 } = require('./errors');


app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  //   console.log(err);
  res.status(handle400).json({ msg: 'Key (slug)=(mitch) already exists' });
});

module.exports = app;
