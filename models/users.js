const connection = require('../db/connection');

exports.getUsers = () => connection
  .select('*')
  .from('users');

exports.addUser = newUser => connection
  .insert(newUser).into('users').returning('*');

exports.getUserByUsername = (username) => {
  const basePromise = connection
    .select('users.*')
    .from('users')
    .where('users.username', username);

  return basePromise;
};
