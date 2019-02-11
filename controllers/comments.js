const { getComment } = require('../models/comments');

exports.fetchComment = (req, res, next) => {
  // destructuring of req.query
  getComment(req.query)
    .then(comment => res.status(200).send({ comment }))
    .catch(next);
};
