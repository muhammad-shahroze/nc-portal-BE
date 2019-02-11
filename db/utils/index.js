exports.formatArticles = (articles, topics) => {
  const formattedArticles = articles.map((article) => {
    const dateTimeString = new Date(article.created_at);
    const topicKey = topics.find(topic => topic.slug === article.topic);
    console.log(topicKey);
    // console.log(topicKey.slug);
    const newArticle = {
      ...article, topic: topicKey.slug, author: article.created_by, created_at: dateTimeString,
    };
    delete newArticle.topic;
    delete newArticle.created_by;
    // console.log(newArticle);
    return newArticle;
  });
  // console.log(formattedArticles);
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
