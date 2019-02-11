const connection = require('../db/connection');

exports.getTopic = () => connection
  .select('*')
  .from('topics');


exports.addTopic = newTopic => connection
  .insert(newTopic).into('topics').returning('*');
