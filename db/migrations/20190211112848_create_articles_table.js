exports.up = function (connection, Promise) {
  // console.log('creating article table...');
  return connection.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.text('body').notNullable();
    articlesTable.integer('votes').defaultsTo(0);
    articlesTable.string('topic').references('slug').inTable('topics');
    articlesTable.string('author').references('username').inTable('users');
    articlesTable.datetime('created_at').defaultTo(connection.fn.now());
  });
};

exports.down = function (connection, Promise) {
  // console.log('removing article tables...');
  return connection.schema.dropTable('articles');
};
