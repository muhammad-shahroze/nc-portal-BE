const connection = require('../db/connection');

exports.getUser = () => connection
  .select('*')
  .from('topics');
