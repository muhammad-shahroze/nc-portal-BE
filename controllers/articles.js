const { getArticle } = require('../models/articles');

exports.fetchArticles = (req, res, next) => {
  // destructuring of req.query
  getArticle()
    .then((articles) => {
      // console.log(articles);
      // const total_count = articles.length;
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
