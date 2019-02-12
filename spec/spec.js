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
  });
  describe('articles', () => {
    it('GET / status:200 responds with array of article objects', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0]).to.contain.keys('article_id', 'title', 'topic', 'author', 'votes', 'body', 'created_at', 'comment_count');
      }));
    it('GET / status:200 responds with array of article filtered by username', () => request
      .get('/api/articles?author=icellusedkars')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles).to.have.length(6);
      }));
    it('GET / status:200 responds with array of article filtered by topic', () => request
      .get('/api/articles?topic=cats')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles).to.have.length(1);
      }));
    it('GET / returns articles sorted by the title descending', () => request
      .get('/api/articles?sort_by=title')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].title).to.equal('Z');
      }));
    it('GET / returns articles sorted by author descending', () => request
      .get('/api/articles?sort_by=author')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].author).to.equal('rogersop');
      }));
    it('GET / returns articles sorted by the date they were created_at descending', () => request
      .get('/api/articles?sort_by=created_at')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].created_at).to.equal('2018-11-15T12:21:54.171Z');
      }));
    it('GET / returns articles sorted by order asc', () => request
      .get('/api/articles?order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].title).to.equal('Moustache');
      }));
    it('GET / limit number of articles by default limit when no query is passed (DEAFULT CASE) ', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(10);
        expect(body.articles[9].body).to.equal('Who are we kidding, there is only one, and it\'s Mitch!');
      }));
    it('GET / returns number of items chosen in the query maxLimit', () => request
      .get('/api/articles?limit=4')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(4);
      }));
    it('GET / returns number of items chosen from query paginate by page', () => request
      .get('/api/articles?limit=6&page=2')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(6);
      }));
    it('GET / status:200 responds with total_count of articles', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(10);
        expect(body.total_count).to.equal(10);
        // expect(body.articles).to.have.property('author');
      }));
    it('POST / status:201 responds with posted article object', () => request
      .post('/api/articles')
      .send({
        title: 'Down with the shadows', body: 'Death is only the start', topic: 'cats', author: 'rogersop',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.article.article_id).to.eql(13);
        expect(body.article).to.have.keys(
          'article_id',
          'title',
          'topic',
          'author',
          'body',
          'created_at',
          'votes',
        );
      }));
    it('GET / status:200 responds with an article object using the id', () => request
      .get('/api/articles/5')
      .expect(200)
      .then(({ body }) => {
        expect(body.article).to.be.an('object');
        expect(body.article).to.contain.keys(
          'article_id',
          'title',
          'topic',
          'author',
          'body',
          'created_at',
          'votes',
        );
      }));
    // it('GET / status:400 (Bad Request) client uses invalid slug', () => request
    //   .get('/api/topics/canada/articles')
    //   .expect(400));
  });
});
