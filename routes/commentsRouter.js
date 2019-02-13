const apiRouter = require('express').Router();

const { patchComment, deleteComment } = require('../controllers/comments');

apiRouter.route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment);


module.exports = apiRouter;
