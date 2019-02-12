const connection = require('../db/connection');

exports.getArticle = (author, topic, sort_by = 'created_at', order = 'desc', limit = 10, page = 1) => {
  const basePromise = connection
    .column('articles.article_id', 'title', 'articles.topic', 'articles.author', 'articles.votes', 'articles.body', 'articles.created_at')
    .select()
    .from('articles')
    .count('comments.article_id AS comment_count')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .limit(limit)
    .offset(limit * (page - 1));

  if (author) {
    return basePromise.where('articles.author', author);
  }
  if (topic) {
    return basePromise.where('articles.topic', topic);
  }
  return basePromise;
};

exports.getTotalArticles = (author, topic, sort_by = 'created_at', order = 'desc') => {
  const totalArticlePormise = connection
    .column('articles.article_id', 'title', 'articles.topic', 'articles.author', 'articles.votes', 'articles.body', 'articles.created_at')
    .select()
    .from('articles')
    .count('comments.article_id AS comment_count')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order);

  if (author) {
    return totalArticlePormise.where('articles.author', author);
  }
  if (topic) {
    return totalArticlePormise.where('articles.topic', topic);
  }
  return totalArticlePormise;
};


exports.getArticleById = (article_id) => {
  const basePromise = connection
    .select('*')
    .from('articles');

  if (article_id) {
    return basePromise.where('articles.article_id', article_id);
  }
  return basePromise;
};

exports.addArticle = newArticle => connection
  .insert(newArticle).into('articles').returning('*');
