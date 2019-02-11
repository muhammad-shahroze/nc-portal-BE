exports.up = function (connection, Promise) {
  // console.log('creating comment table...');
  return connection.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author').references('username').inTable('users');
    commentsTable.integer('article_id').references('article_id').inTable('articles');
    commentsTable.string('votes').defaultsTo(0);
    commentsTable.datetime('created_at', 50).defaultTo(connection.fn.now(50));
    commentsTable.string('body', 2500).notNullable();
  });
};

exports.down = function (connection, Promise) {
  // console.log('removing comment tables...');
  return connection.schema.dropTable('comments');
};
