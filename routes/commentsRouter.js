const apiRouter = require('express').Router();
const { handle405 } = require('../errors');

const { patchComment, deleteComment } = require('../controllers/comments');

apiRouter.route('/:comment_id')
  .patch(patchComment)
  .delete(deleteComment)
  .all(handle405);


module.exports = apiRouter;
