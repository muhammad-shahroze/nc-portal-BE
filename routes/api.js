const apiRouter = require('express').Router();
const { fetchTopic, postTopic } = require('../controllers/topics');
const { fetchUser } = require('../controllers/users');
const { fetchArticles } = require('../controllers/articles');
const { fetchComment } = require('../controllers/comments');

apiRouter.route('/topics').get(fetchTopic);
apiRouter.route('/topics').post(postTopic);

apiRouter.route('/articles').get(fetchArticles);
apiRouter.route('/topics/:topic/articles').get(fetchArticles);


apiRouter.route('/users').get(fetchUser);
apiRouter.route('/comments').get(fetchComment);


module.exports = apiRouter;
