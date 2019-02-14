const apiRouter = require('express').Router();
const { fetchTopic, postTopic } = require('../controllers/topics');
const { handle405 } = require('../errors');

apiRouter.route('/')
  .get(fetchTopic)
  .post(postTopic)
  .all(handle405);

module.exports = apiRouter;
