;
\c nc_knews_test;

SELECT *
FROM articles
LIMIT
6
OFFSET 6;


-- SELECT articles.article_id, title, articles.topic, articles.author, articles.votes, articles.body, articles.created_at, COUNT(comments.article_id) AS comment_count
-- FROM articles
--   LEFT JOIN comments ON articles.article_id = comments.article_id
-- GROUP BY articles.article_id;
-- WHERE articles.article_id = 1;

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