const {
  topicData, userData, articleData, commentData,
} = require('../data/index');
const { formatArticles, formatComments } = require('../utils');

exports.seed = (connection, Promise) => connection.migrate
  .rollback()
  .then(() => connection.migrate.latest())
  .then(() => connection('topics').insert(topicData).returning('*'))
  .then(topicRows => Promise.all([topicRows, connection.insert(userData).into('users').returning('*')]))
  .then(([topicRows]) => {
    const formattedArticles = formatArticles(articleData, topicRows);
    return connection('articles').insert(formattedArticles).returning('*');
  })
  .then((articlesRows) => {
    const formattedCommentData = formatComments(commentData, articlesRows);
    return connection('comments').insert(formattedCommentData).returning('*');
  });
