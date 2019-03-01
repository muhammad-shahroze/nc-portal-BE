# NC News

This is an API I have built to accompany my front end design for NC News. It includes articles, topics, comments and users end-points, with convenient user friendly functionality. You can find the most recent version of the API deployed over on [Heroku](https://afternoon-beyond-70751.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prequisites

To only thing you will need to install is the most recent version of PostgreSQL.

### Installing

First of all, you need to fork and clone the repository from Github.

Then you will need to install the necessary dependencies by typing the following command in your terminal.

```js
npm install```

Then you will need to create a knexfile.js to access the database.

```js
knex.js;```

Once you have entered the command it should create a knexfile.js, make sure it looks something like this:

```js
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'nc_news',
      user: 'Username (Linux only)',
      password: 'Password (Linux only)'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};```

## Testing

I tested this API with mocha and chai, you can run the tests by typing `npm test`. The tests are built to drop and re-create the database before each one runs, this ensures no data is changed, potentionally causing following tests to fail.

The following snippet is an example of a test.

```js
it('GET/ status 200/ responds with an array of topic objects', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an('array');
          expect(body.topics[0]).to.contain.keys('slug', 'description');
        });```

As you can see, the method, expected response status and description of each test is within the title. Below that you can see the request, the path this particular request is running on, as well as the tests themselves. In this case it's seeing whether the topic objects are within an array and looking within the first instance to check the keys match with that of a topic object.

## Built with

- Knex
- Express
- Supertest
- Mocha

## Acknowledgments

- Northcoders
- Knexjs.org