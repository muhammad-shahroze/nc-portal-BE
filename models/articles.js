const connection = require('../db/connection');

exports.getArticle = () => connection
  .select('*')
  .from('articles');
// .where('topic', 'mitch');
// .count('');


// `author` which is the `username` from the users table
//   * `title`
//   * `article_id`
//   * `topic`
//   * `created_at`
//   * `votes`
//   * `comment_count`
