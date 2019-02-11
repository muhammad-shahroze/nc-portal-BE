exports.up = function (connection, Promise) {
  // console.log('creating article table...');
  return connection.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title');
    articlesTable.text('body').notNullable();
    articlesTable.string('votes').defaultsTo(0);
    articlesTable.string('slug').references('slug').inTable('topics');
    articlesTable.string('author').references('username').inTable('users');
    articlesTable.datetime('created_at', 6).defaultTo(connection.fn.now(6));
  });
};

exports.down = function (connection, Promise) {
  // console.log('removing article tables...');
  return connection.schema.dropTable('articles');
};
