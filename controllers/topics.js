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
  // console.log(req.body);
  addTopic(req.body)
    .then(([topics]) => res.status(201).send({ topics }))
    .catch((err) => {
      next(err);
    });
};
