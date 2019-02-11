exports.up = function (connection, Promise) {
  // console.log('creating user table...');
  return connection.schema.createTable('users', (usersTable) => {
    usersTable.string('username').primary().unique();
    usersTable.string('name').notNullable();
    usersTable.string('avatar_url').notNullable();
  });
};

exports.down = function (connection, Promise) {
  // console.log('removing user tables...');
  return connection.schema.dropTable('users');
};
