const connection = require('../db/connection');

exports.getComment = () => connection
  .select('*')
  .from('topics');
