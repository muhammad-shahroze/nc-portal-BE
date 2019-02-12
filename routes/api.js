const apiRouter = require('express').Router();
const { fetchTopic, postTopic } = require('../controllers/topics');
const { fetchUser } = require('../controllers/users');
const {
  fetchArticles, fetchTotalArticles, fetchArticleById, postArticle,
} = require('../controllers/articles');
const { fetchComment } = require('../controllers/comments');

apiRouter.route('/topics').get(fetchTopic);
apiRouter.route('/topics').post(postTopic);

apiRouter.route('/articles').get(fetchArticles);
apiRouter.route('/articles').get(fetchTotalArticles);
apiRouter.route('/articles/:article_id').get(fetchArticleById);
apiRouter.route('/articles').post(postArticle);


apiRouter.route('/users').get(fetchUser);
apiRouter.route('/comments').get(fetchComment);


module.exports = apiRouter;
