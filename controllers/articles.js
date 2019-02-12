const {
  getArticle, getTotalArticles, getArticleById, addArticle,
} = require('../models/articles');

exports.fetchArticles = (req, res, next) => {
  // destructuring of req.query
  const {
    author, topic, sort_by, order, limit, page,
  } = req.query;
  getArticle(author, topic, sort_by, order, limit, page)
    .then((articles) => {
      const total_count = articles.length;
      res.status(200).send({
        articles, author, topic, sort_by, order, limit, page, total_count,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.fetchTotalArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order,
  } = req.query;
  getTotalArticles(author, topic, sort_by, order)
    .then((articles) => {
      const total_count = articles.length;
      res.status(200).send({
        articles, author, topic, sort_by, order, total_count,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.fetchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};


exports.postArticle = (req, res, next) => {
  // console.log(req.body);
  addArticle(req.body)
    .then(([article]) => res.status(201).send({ article }))
    .catch((err) => {
      next(err);
    });
};
