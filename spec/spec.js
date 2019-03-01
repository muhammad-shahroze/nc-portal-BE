process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/api', () => {
  beforeEach(() => connection.seed.run());

  after(() => connection.destroy());

  describe('topics', () => {
    it('GET / status:200 responds with an array of topic objects', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics[0]).to.contain.keys('description', 'slug');
      }));
    it('POST / status:201 responds with posted topic object', () => request
      .post('/api/topics')
      .send({ description: 'Hi there boss!', slug: 'Sharoze' })
      .expect(201)
      .then(({ body }) => {
        expect(body.topic).to.eql({
          description: 'Hi there boss!',
          slug: 'Sharoze',
        });
      }));
    it('POST / 400 given for missing description property)', () => request
      .post('/api/topics')
      .send({ slug: 'Godzilla' })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).to.equal('Bad Request - Invalid Property/Property Missing!');
      }));
    it('GET / 405 given a method that is not allowed ', () => request
      .delete('/api/topics')
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal('Method Not Allowed');
      }));
    it('POST / 422 given for keying existing slug (unprocessible)', () => request
      .post('/api/topics')
      .send({ description: 'Hello Master!', slug: 'cats' })
      .expect(422)
      .then(({ body }) => {
        expect(body.message).to.equal('Unique Key Violation!. Request cannot be proccessed');
      }));
  });
  describe('articles', () => {
    it('GET / status:200 responds with an array of article objects', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0]).to.contain.keys('article_id', 'title', 'topic', 'author', 'votes', 'body', 'created_at');
      }));
    it('GET / status:200 responds with an array of article objects with correct comment_count property', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('array');
        expect(body.articles[0]).to.contain.key('comment_count');
        expect(body.articles[0].comment_count).to.equal('13');
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
    it('GET / returns articles sorted by (DEFAULT) to Date', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].created_at).to.equal('2018-11-15T12:21:54.171Z');
      }));
    it('GET / returns articles sorted by (QUERY) order asc', () => request
      .get('/api/articles?order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].title).to.equal('Moustache');
      }));
    it('GET / returns articles sorted by (DEFAULT) order desc', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].title).to.equal('Living in the shadow of a great man');
      }));
    it('GET / limit number of articles by (QUERY) limit ', () => request
      .get('/api/articles?limit=5')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(5);
        expect(body.articles[2].body).to.equal('some gifs');
      }));
    it('GET / limit number of articles by (DEAFULT) limit ', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(10);
        expect(body.articles[9].body).to.equal('Who are we kidding, there is only one, and it\'s Mitch!');
      }));
    it('GET / returns number of items (QUERY) paginated by page when page = 1', () => request
      .get('/api/articles?limit=5&page=1')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(5);
        expect(body.articles[2].body).to.equal('some gifs');
      }));
    it('GET / returns number of items (QUERY) paginated by page when page = 2', () => request
      .get('/api/articles?limit=6&page=2')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(6);
        expect(body.articles[5].body).to.equal('Have you seen the size of that thing?');
      }));
    it('GET / status:200 responds with total_count of articles', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(10);
        expect(body.total_count).to.equal('12');
      }));
    it('GET / status:200 responds with total_count of articles (QUERY) filtered by author', () => request
      .get('/api/articles?author=icellusedkars')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(6);
        expect(body.total_count).to.equal('12');
      }));
    it('GET / status:200 responds with total_count of articles (QUERY) filtered by sort_by', () => request
      .get('/api/articles?sort_by=body')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.have.length(10);
        expect(body.total_count).to.equal('12');
        expect(body.articles[0].body).to.equal('some gifs');
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
    it('GET / 405 given a method that is not allowed ', () => request
      .delete('/api/articles')
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal('Method Not Allowed');
      }));
    it('POST / 422 unproccessable Identity username is not unique', () => request
      .post('/api/articles')
      .send({
        title: 'Down with the shadows', body: 'Death is only the start', topic: 'cats', author: 'timMartin',
      })
      .expect(422)
      .then(({ body }) => {
        expect(body.message).to.equal('Unique Key Violation!. Request cannot be proccessed');
      }));
    it('GET / status:200 responds with an array of topic objects', () => request
      .get('/api/articles?sort_by=description')
      .expect(500)
      .then(({ body }) => {
        expect(body.message).to.equal('Property does not Exist - Internal Server Error');
      }));
    describe('/articles/:article_id', () => {
      it('GET / status:200 responds with an article object by article id', () => request
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
      it('GET / status:200 responds with an article object by article id with correct comment_count property', () => request
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an('object');
          expect(body.article).to.contain.key('comment_count');
          expect(body.article.comment_count).to.equal('13');
        }));
      it('PATCH / status:200 patches the article object and increments', () => request
        .patch('/api/articles/5')
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an('object');
          expect(body.article.votes).to.equal(1);
        }));
      it('PATCH / status:200 patches the article object and decrements', () => request
        .patch('/api/articles/1')
        .send({ inc_votes: -100 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an('object');
          expect(body.article.votes).to.equal(0);
        }));
      it('PATCH / status:200 no body responds with an unmodified article', () => request
        .patch('/api/articles/1')
        .send()
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an('object');
          expect(body.article.votes).to.equal(100);
        }));
      it('DELETE / status:204 (No Content) deletes the article object given valid article_id', () => request
        .delete('/api/articles/8')
        .expect(204));
      it('GET / 404 given correct ID but invalid votes type', () => request
        .patch('/api/articles/5')
        .send({ inc_votes: 'ten' })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Bad Request - Invalid (inc-votes) Type');
        }));
      it('GET / 400 given an ID (Bad-Request) wrong format', () => request
        .get('/api/articles/banana')
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Bad Request - ID should be an Integer');
        }));
      it('PATCH / 400 given an ID (Bad-Request) wrong format used for comment_id', () => request
        .patch('/api/articles/wonderful')
        .send()
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Bad Request - ID should be an Integer');
        }));
      it('DELETE / status:400 given a non existent article_id', () => request
        .delete('/api/articles/seventeen')
        .expect(400));
      it('DELETE / status:404 given a non existent article_id', () => request
        .delete('/api/articles/99999')
        .expect(404)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found - Article Does Not Exist!');
        }));
      it('GET / 404 given an ID that does not exist', () => request
        .get('/api/articles/00000000000000111')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Article Not Found');
        }));
      it('GET / status:200 url contains a non-existent (but potentially valid) article_id', () => request
        .get('/api/articles/50')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Article Not Found');
        }));
      it('GET / 405 given a method that is not allowed ', () => request
        .put('/api/articles/4')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal('Method Not Allowed');
        }));
    });
  });
  describe('comments', () => {
    describe('articles/:article_id/comments', () => {
      it('GET / status:200 responds with an comments object by article id', () => request
        .get('/api/articles/5/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an('array');
          expect(body.comments[0]).to.contain.keys(
            'comment_id', 'votes', 'created_at', 'author', 'body',
          );
        }));
      it('GET / returns comments sorted by the date they were created_at descending', () => request
        .get('/api/articles/5/comments?sort_by=created_at')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].created_at).to.equal('2004-11-25T12:36:03.389Z');
        }));
      it('GET / returns comments sorted by author', () => request
        .get('/api/articles/5/comments?sort_by=author')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].author).to.equal('icellusedkars');
        }));
      it('GET / returns comments sorted by (QUERY) order asc', () => request
        .get('/api/articles/1/comments?order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].created_at).to.equal('2000-11-26T12:36:03.389Z');
        }));
      it('GET / sorts in the data (DEFAULT order=desc) and (DEFAULT sort_by=created_at)', () => request
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].body).to.equal('The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.');
        }));
      it('GET / returns comments sorted by the date they were created_at descending', () => request
        .get('/api/articles/1/comments?sort_by=comment_id')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0].body).to.equal('This morning, I showered for nine minutes.');
        }));
      it('GET / returns number of comments by (QUERY) limit', () => request
        .get('/api/articles/1/comments?limit=4')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.length(4);
        }));
      it('GET / returns number of comments by (DEFAULT) limit', () => request
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.length(10);
        }));
      it('GET / returns number of comments chosen from query paginate by page = 1', () => request
        .get('/api/articles/1/comments?limit=8&page=1')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.length(8);
          expect(body.comments[5].body).to.equal('Lobster pot');
        }));
      it('GET / returns number of comments chosen from query paginate by page = 2', () => request
        .get('/api/articles/1/comments?limit=4&page=2')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.have.length(4);
          expect(body.comments[2].body).to.equal('Delicious crackerbreads');
        }));
      it('POST / status:201 responds with posted comment object when given a valid ID', () => request
        .post('/api/articles/5/comments')
        .send({
          author: 'butter_bridge', body: 'Dream big and dare to fail',
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.body).to.eql('Dream big and dare to fail');
          expect(body.comment).to.have.keys(
            'comment_id',
            'author',
            'article_id',
            'votes',
            'body',
            'created_at',
          );
        }));
      it('GET / status:400 url contains an invalid article_id', () => request
        .get('/api/articles/banana/comments')
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Bad Request - ID should be an Integer');
        }));
      it('POST / status:400 given an invalid body referencing a non-existent column', () => request
        .post('/api/articles/5/comments')
        .send({
          author: 'butter_bridge', comment_id: 125,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal('Bad Request - Invalid Property/Property Missing!');
        }));
      it('GET / status:200 given a non-existent article_id', () => request
        .get('/api/articles/1000/comments')
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal('Bad Request - Article Not Found');
        }));
      it('GET / 405 given a method that is not allowed ', () => request
        .put('/api/articles/4/comments')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal('Method Not Allowed');
        }));
      it('POST / 422 unproccessable Identity username is not unique', () => request
        .post('/api/articles/40/comments')
        .send({ author: 'butter_bridge', body: 'Dream big and dare to fail' })
        .expect(422)
        .then(({ body }) => {
          expect(body.message).to.equal('Unique Key Violation!. Request cannot be proccessed');
        }));
      it('POST / 422 given a non existent username', () => request
        .post('/api/articles/4/comments')
        .send({ author: 'ridge_racer', body: 'Dream big and dare to fail' })
        .expect(422)
        .then(({ body }) => {
          expect(body.message).to.equal('Unique Key Violation!. Request cannot be proccessed');
        }));
      describe('comments/:comment_id', () => {
        it('PATCH / status:200 patches the comment object and increments', () => request
          .patch('/api/comments/2')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.be.an('object');
            expect(body.comment.votes).to.equal(15);
          }));
        it('PATCH / status:200 patches the comment object and decrements', () => request
          .patch('/api/comments/2')
          .send({ inc_votes: -1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.be.an('object');
            expect(body.comment.votes).to.equal(13);
          }));
        it('DELETE / status:204 (No Content) deletes the comment object with comment_id', () => request
          .delete('/api/comments/8')
          .expect(204));
        it('PATCH / status:400 given body with invalid inc-votes responds with ', () => request
          .patch('/api/comments/1')
          .send({ inc_votes: 'twenty' })
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.equal('Bad Request - Invalid (inc-votes) Type');
          }));
        it('PATCH / status:200 with no body responds with an unmodified comment', () => request
          .patch('/api/comments/1')
          .send({})
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.votes).to.equal(16);
          }));
        it('PATCH / 404 non-existent comment_id is used', () => request
          .patch('/api/comments/23456')
          .send({ inc_votes: 5 })
          .expect(404)
          .then((res) => {
            expect(res.body.message).to.equal('Not Found - Comment Does Not Exist!');
          }));
        it('DELETE / status:400 given a non existent comment_id', () => request
          .delete('/api/comments/200000')
          .expect(404)
          .then((res) => {
            expect(res.body.message).to.equal('Not Found - Comment Does Not Exist!');
          }));
        it('GET / 405 given a method that is not allowed ', () => request
          .put('/api/comments/4')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('Method Not Allowed');
          }));
      });
    });
  });
  describe('users', () => {
    it('GET / status:200 responds with array of user objects', () => request
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.users).to.be.an('array');
        expect(body.users[0]).to.contain.keys('username', 'avatar_url', 'name');
      }));
    it('POST / status:201 responds with posted user object', () => request
      .post('/api/users')
      .send({ username: 'BillGates', avatar_url: 'https://cdn.britannica.com/47/188747-050-1D34E743.jpg', name: 'Bill Gates' })
      .expect(201)
      .then(({ body }) => {
        expect(body.user).to.eql({
          username: 'BillGates',
          avatar_url: 'https://cdn.britannica.com/47/188747-050-1D34E743.jpg',
          name: 'Bill Gates',
        });
      }));
    it('GET / status:200 responds with an user object by username', () => request
      .get('/api/users/butter_bridge')
      .expect(200)
      .then(({ body }) => {
        expect(body.user).to.be.an('object');
        expect(body.user).to.contain.keys(
          'username',
          'avatar_url',
          'name',
        );
      }));
    it('GET / status:200 responds with an user object by username', () => request
      .get('/api/users/rogersop')
      .expect(200)
      .then(({ body }) => {
        expect(body.user).to.be.an('object');
        expect(body.user).to.eql({
          username: 'rogersop',
          avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
          name: 'paul',
        });
      }));
    it('GET / 404 given a username that does not exist', () => request
      .get('/api/users/BillGates')
      .expect(404)
      .then(({ body }) => {
        expect(body.message).to.equal('Route Does Not Exist');
      }));
    it('GET / 405 given a method that is not allowed ', () => request
      .delete('/api/users')
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal('Method Not Allowed');
      }));
    it('GET / 405 given a method that is not allowed ', () => request
      .delete('/api/users/rogersop')
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal('Method Not Allowed');
      }));
    it('POST / 422 unproccessable Identity username is not unique', () => request
      .post('/api/users')
      .send({ username: 'rogersop', avatar_url: 'https://cdn.britannica.com/47/188747-050-1D34E743.jpg', name: 'Bill Gates' })
      .expect(422)
      .then(({ body }) => {
        expect(body.message).to.equal('Unique Key Violation!. Request cannot be proccessed');
      }));
  });
});
