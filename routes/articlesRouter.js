const apiRouter = require('express').Router();
const {
  fetchArticles, fetchArticleById, postArticle, patchArticle, deleteArticle,
} = require('../controllers/articles');
const {
  fetchCommentsByArticleId, postCommentByArticleId,
} = require('../controllers/comments');

apiRouter.route('/')
  .get(fetchArticles)
  .post(postArticle);

apiRouter.route('/:article_id')
  .get(fetchArticleById)
  .patch(patchArticle)
  .delete(deleteArticle);

apiRouter.route('/:article_id/comments')
  .get(fetchCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = apiRouter;
