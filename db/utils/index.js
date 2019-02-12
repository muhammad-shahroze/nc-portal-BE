exports.formatArticles = (articles) => {
  const formattedArticles = articles.map(({ created_at, ...remainingArticle }) => {
    const dateTimeString = new Date(created_at);
    const newArticle = {
      ...remainingArticle, created_at: dateTimeString,
    };
    return newArticle;
  });
  return formattedArticles;
};

exports.formatComments = (comments, articles) => comments.map(({
  body, belongs_to, created_by, votes, created_at,
}) => {
  const articleReference = articles.find(article => article.title === belongs_to);
  const dateTimeString = new Date(created_at);
  return {
    author: created_by,
    created_at: dateTimeString,
    article_id: articleReference.article_id,
    votes,
    body,
  };
});
