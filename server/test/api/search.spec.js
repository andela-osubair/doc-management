import { agent } from 'supertest';
import expect from 'expect';
import app from '../../../bin/www';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
const server = agent(app);


describe('Search API', () => {
  let adminDetails;
  let regularDetails;

  before((done) => {
    server
      .post('/users/login')
      .type('form')
      .send({
        email: 'administrator@gmail.com',
        password: 'admin'
      })
      .end((err, res) => {
        adminDetails = res.body;
        server
          .post('/users/login')
          .type('form')
          .send({
            email: 'regular@gmail.com',
            password: 'regular'
          })
          .end((err, res) => {
            regularDetails = res.body;
            done();
          });
      });
  });

  describe('User Search', () => {
    it('Should return a list of users based on search criteria', (done) => {
      server
        .get('/search/users/?term=dupe')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.body.user[0].username).toEqual('dupe');
          done();
        });
    });

    it('Should return users not found', (done) => {
      server
        .get('/search/users/?term=zu')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('Users Not Found');
          done();
        });
    });

    it('Should return error for non-admin search', (done) => {
      server
        .get('/search/users/?term=r')
        .set({ 'x-access-token': regularDetails.token })
        .end((err, res) => {
          expect(res.body.message)
          .toEqual('User is unauthorized for this request.');
          done();
        });
    });
  });

  describe('Document Search', () => {
    it('Should return a list of documents based on search criteria', (done) => {
      server
        .get('/search/documents/?term=test')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.body).toExist('title');
          if (res.body.message) {
            expect(res.body.message).toEqual('Documents Not Found');
          }
          done();
        });
    });

    it('Should return documents not found', (done) => {
      server
        .get('/search/documents/?term=zu')
        .set({
          'x-access-token': adminDetails.token
        })
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('Documents Not Found');
          done();
        });
    });

    xit('Should return error for non-admin search', (done) => {
      server
        .get('/search/documents/?term=in')
        .set({ 'x-access-token': regularDetails.token })
        .end((err, res) => {
          expect(res.body.message)
          .toEqual('User is unauthorized for this request.');
          done();
        });
    });
  });
});
