const { getUsers, addUser, getUserByUsername } = require('../models/users');

exports.fetchUsers = (req, res, next) => {
  // destructuring of req.query
  getUsers()
    .then(users => res.status(200).send({ users }))
    .catch(next);
};

exports.postUser = (req, res, next) => {
  addUser(req.body)
    .then(([user]) => {
      if (user) return res.status(201).send({ user });
      return Promise.reject({ status: 422, msg: 'Unique Key Violation!. Request cannot be proccessed' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.fetchUserByUsername = (req, res, next) => {
  const { username } = req.params;
  getUserByUsername(username)
    .then(([user]) => {
      if (user) return res.status(200).send({ user });
      return Promise.reject({ status: 404, msg: 'Route Does Not Exist' });
    })
    .catch((err) => {
      next(err);
    });
};
