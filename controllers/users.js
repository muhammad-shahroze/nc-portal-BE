const { getUsers, addUser, getUserByUsername } = require('../models/users');

exports.fetchUsers = (req, res, next) => {
  // destructuring of req.query
  getUsers()
    .then(users => res.status(200).send({ users }))
    .catch(next);
};

exports.postUser = (req, res, next) => {
  addUser(req.body)
    .then(([user]) => res.status(201).send({ user }))
    .catch((err) => {
      next(err);
    });
};

exports.fetchUserByUsername = (req, res, next) => {
  const { username } = req.params;
  getUserByUsername(username)
    .then(([user]) => {
      // next({msg: 'ID not found', code: 404})
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
