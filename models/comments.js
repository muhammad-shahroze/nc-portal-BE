const connection = require('../db/connection');

exports.getCommentsByArticleId = (article_id, sort_by, order = 'desc', limit = 10, page = 1) => {
  const basePromise = connection
    .column('comments.comment_id', 'comments.votes', 'comments.created_at', 'comments.author', 'comments.body')
    .select()
    .from('comments')
    .leftJoin('articles', 'comments.article_id', 'articles.article_id')
    .where('articles.article_id', article_id)
    .orderBy(sort_by || 'comments.created_at', order)
    .limit(limit)
    .offset(limit * (page - 1));
  return basePromise;
};

exports.addCommentByArticleId = newComment => connection
  .insert(newComment)
  .into('comments')
  .returning('*');


exports.patchCommentById = (comment_id, inc_votes) => {
  const basePromise = connection('comments')
    .where('comments.comment_id', comment_id)
    .increment('votes', +inc_votes || 0)
    .returning('*');

  return basePromise;
};

exports.deleteCommentById = (comment_id) => {
  const basePromise = connection
    .select('comments.*')
    .from('comments')
    .where('comments.comment_id', comment_id)
    .del();

  return basePromise;
};
