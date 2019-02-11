process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/api', () => {
  beforeEach(() => connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => connection.seed.run()));

  after(() => connection.destroy());

  describe('topics', () => {
    it('GET / status:200 responds with array of topic objects', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics[0]).to.contain.keys('description', 'slug');
      }));
    it('POST / status:201 responds with posted topic object', () => request
      .post('/api/topics')
      .send({ description: 'Hi there!', slug: 'Sharoze' })
      .expect(201)
      .then(({ body }) => {
        expect(body.topics).to.eql({
          description: 'Hi there!',
          slug: 'Sharoze',
        });
      }));
    // it('GET / status:200 responds with total_count of articles by topic', () => request
    //   .get('/api/topics/cats/articles')
    //   .expect(200)
    //   .then(({ body }) => {
    //     console.log(body);
    //     expect(body.articles).to.have.length(1);
    //     expect(body.total_count).to.equal(1);
    //     // expect(body.articles).to.have.property('author');
    //   }));
    // it('GET / status:400 (Bad Request) client uses invalid slug', () => request
    //   .get('/api/topics/canada/articles')
    //   .expect(400));
  });
  describe('articles', () => {
    it('GET / status:200 responds with array of article objects', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        // console.log(body);
        expect(body.articles).to.be.an('array');
        expect(body.articles[0]).to.contain.keys('article_id', 'title', 'topic', 'author', 'votes', 'body', 'created_at');
      }));
  });
});
