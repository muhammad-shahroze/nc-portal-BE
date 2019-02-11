;
\c nc_knews_test;

SELECT username AS author, title, article_id, slug AS topic, created_at, votes
FROM articles;
  -- JOIN comments ON articles.article_id = comments.article_id
-- WHERE article_id = 2;


  -- .select('parties.party', 'parties.founded')
  -- .count('mps.mp_id as mp_count')
  -- .leftJoin('mps', 'parties.party', '=', 'mps.party')
  -- .from('parties')
  -- .limit(limit)
  -- .groupBy('parties.party')
  -- .orderBy(sort_by, 'desc');