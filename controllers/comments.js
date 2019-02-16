const {
  getCommentsByArticleId, addCommentByArticleId, patchCommentById, deleteCommentById,
} = require('../models/comments');

exports.fetchCommentsByArticleId = (req, res, next) => {
  const {
    sort_by, order, limit, page,
  } = req.query;
  const { article_id } = req.params;
  getCommentsByArticleId(article_id, sort_by, order, limit, page)
    .then((comments) => {
      // console.log(comments, '<<<<');
      // next({msg: 'ID not found', code: 404})
      res.status(200).send({
        comments, sort_by, order, limit, page,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const insertedComment = req.body;
  addCommentByArticleId({ article_id, ...insertedComment })
    .then(([comment]) => {
      if (comment) return res.status(201).send({ comment });
      return Promise.reject({ status: 422, msg: 'Unique Key Violation!. Request cannot be proccessed' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  patchCommentById(comment_id, inc_votes)
    .then(([comment]) => {
      if (typeof inc_votes !== 'number') return Promise.reject({ status: 400, msg: 'Bad Request - Invalid (inc-votes) Type' });
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id)
    .then(() => {
      res.status(204).send();
      return Promise.reject({ status: 404, msg: 'Not Found - Comment Does Not Exist!' });
    })
    .catch((err) => {
      next(err);
    });
};
