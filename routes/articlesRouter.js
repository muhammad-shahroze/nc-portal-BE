const apiRouter = require('express').Router();
const {
  fetchArticles, fetchArticleById, postArticle, patchArticle, deleteArticle,
} = require('../controllers/articles');
const {
  fetchCommentsByArticleId, postCommentByArticleId,
} = require('../controllers/comments');
const { handle405 } = require('../errors');

apiRouter.route('/')
  .get(fetchArticles)
  .post(postArticle)
  .all(handle405);

apiRouter.route('/:article_id')
  .get(fetchArticleById)
  .patch(patchArticle)
  .delete(deleteArticle)
  .all(handle405);

apiRouter.route('/:article_id/comments')
  .get(fetchCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(handle405);
module.exports = apiRouter;
