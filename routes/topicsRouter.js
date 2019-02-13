const apiRouter = require('express').Router();
const { fetchTopic, postTopic } = require('../controllers/topics');

apiRouter.route('/')
  .get(fetchTopic)
  .post(postTopic);

module.exports = apiRouter;
