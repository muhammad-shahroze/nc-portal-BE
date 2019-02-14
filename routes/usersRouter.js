const apiRouter = require('express').Router();
const { fetchUsers, postUser, fetchUserByUsername } = require('../controllers/users');
const { handle405 } = require('../errors');

apiRouter.route('/')
  .get(fetchUsers)
  .post(postUser)
  .all(handle405);

apiRouter.route('/:username')
  .get(fetchUserByUsername)
  .all(handle405);


module.exports = apiRouter;
