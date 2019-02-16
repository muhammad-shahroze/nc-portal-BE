const { getTopic, addTopic } = require('../models/topics');

exports.fetchTopic = (req, res, next) => {
  // destructuring of req.query
  getTopic()
    .then(topics => res.status(200).send({ topics }))
    .catch((err) => {
      next(err);
    });
};

exports.postTopic = (req, res, next) => {
  addTopic(req.body)
    .then(([topic]) => {
      if (topic) return res.status(201).send({ topic });
      return Promise.reject({ status: 400, msg: 'Bad Request - - Description property missing!' });
    })
    .catch((err) => {
      next(err);
    });
};
