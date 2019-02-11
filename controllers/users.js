const { getUser } = require('../models/users');

exports.fetchUser = (req, res, next) => {
  // destructuring of req.query
  getUser(req.query)
    .then(user => res.status(200).send({ user }))
    .catch(next);
};
