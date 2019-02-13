const apiRouter = require('express').Router();
const { fetchUsers, postUser, fetchUserByUsername } = require('../controllers/users');

apiRouter.route('/')
  .get(fetchUsers)
  .post(postUser);

apiRouter.route('/:username')
  .get(fetchUserByUsername);


module.exports = apiRouter;
