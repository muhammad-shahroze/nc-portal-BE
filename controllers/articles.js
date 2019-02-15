const {
  getArticles, getArticleById, addArticle, patchArticleById,
  deleteArticleById, getTotalArticlesCount,
} = require('../models/articles');

exports.fetchArticles = (req, res, next) => {
  // destructuring of req.query
  const {
    author, topic, sort_by, order, limit, page,
  } = req.query;
  Promise.all([
    getArticles(author, topic, sort_by, order, limit, page),
    getTotalArticlesCount()])
    .then(([articles, [{ total_count }]]) => {
      // console.log(total_count);
      res.status(200).send({
        articles, total_count,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postArticle = (req, res, next) => {
  // console.log(req.body);
  addArticle(req.body)
    .then(([article]) => {
      if (article) return res.status(201).send({ article });
      return Promise.reject({ status: 422, msg: 'Unique Key Violation!. Request cannot be proccessed' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.fetchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id)
    .then(([article]) => {
      if (article) return res.status(200).send({ article });
      return Promise.reject({ status: 404, msg: 'Route Does Not Exist' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchArticleById(article_id, inc_votes)
    .then(([article]) => {
      if (article) return res.status(200).send({ article });
      return Promise.reject({ status: 404, msg: 'Route Does Not Exist' });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteArticle = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticleById(article_id)
    .then(() => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};
