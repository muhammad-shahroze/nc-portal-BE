const connection = require('../db/connection');

exports.getArticles = (author, topic, sort_by = 'created_at', order = 'desc', limit = 10, page = 1) => {
  const basePromise = connection
    .column('articles.article_id', 'title', 'articles.topic', 'articles.author', 'articles.votes', 'articles.body', 'articles.created_at', 'users.avatar_url')
    .select()
    .from('articles')
    .count('comments.article_id AS comment_count')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .leftJoin('users', 'articles.author', 'users.username')
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

exports.getTotalArticlesCount = () => connection
  .from('articles')
  .count('article_id AS total_count');

exports.getArticleById = (article_id) => {
  const basePromise = connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', article_id)
    .count('comments.article_id AS comment_count')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id');

  return basePromise;
};

exports.addArticle = newArticle => connection
  .insert(newArticle).into('articles').returning('*');


exports.patchArticleById = (article_id, inc_votes) => {
  const basePromise = connection('articles')
    .where('articles.article_id', article_id)
    .increment('votes', +inc_votes || 0)
    .returning('*');

  return basePromise;
};

exports.deleteArticleById = (article_id) => {
  const basePromise = connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', article_id)
    .del();

  return basePromise;
};
