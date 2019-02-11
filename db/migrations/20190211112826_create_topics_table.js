exports.up = function (connection, Promise) {
  // console.log('creating topic table...');
  return connection.schema.createTable('topics', (topicsTable) => {
    topicsTable.string('slug').primary().notNullable();
    topicsTable.string('description').notNullable();
  });
};

exports.down = function (connection, Promise) {
  // console.log('removing topic tables...');
  return connection.schema.dropTable('topics');
};
