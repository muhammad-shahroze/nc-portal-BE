;
\c nc_knews_test;

-- UPDATE articles
-- SET votes = 100

-- SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body
-- FROM comments
--   LEFT JOIN articles ON comments.article_id = articles.article_id
-- WHERE articles.article_id = 1;
-- DELETE FROM articles 
-- WHERE article_id = 5;
SELECT *
FROM comments;

-- UPDATE articles
--   SET votes = votes + 1
--   WHERE article_id = 5
-- RETURNING *;

-- DELETE FROM articles
-- WHERE article_id = 8
-- RETURNING *;

-- SELECT articles.article_id, title, articles.topic, articles.author, articles.votes, articles.body, articles.created_at, COUNT(comments.article_id) AS comment_count
-- FROM articles
--   LEFT JOIN comments ON articles.article_id = comments.article_id
-- GROUP BY articles.article_id;

-- SELECT *
-- FROM articles
-- WHERE author = 'icellusedkars';


  -- .select('parties.party', 'parties.founded')
  -- .count('mps.mp_id as mp_count')
  -- .leftJoin('mps', 'parties.party', '=', 'mps.party')
  -- .from('parties')
  -- .limit(limit)
  -- .groupBy('parties.party')
  -- .orderBy(sort_by, 'desc');