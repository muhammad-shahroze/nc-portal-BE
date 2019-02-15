const router = require('express').Router();
const topicsRouter = require('../routes/topicsRouter');
const articlesRouter = require('../routes/articlesRouter');
const commentsRouter = require('../routes/commentsRouter');
const usersRouter = require('../routes/usersRouter');
const { endPoints } = require('../endpoints');

router.use('/topics', topicsRouter);

router.use('/articles', articlesRouter);

router.use('/comments', commentsRouter);

router.use('/users', usersRouter);

router.get('/api', (req, res) => {
  res.status(200).send(endPoints);
});

module.exports = router;
