import { agent } from 'supertest';
import expect from 'expect';

import app from '../../../bin/www';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
const server = agent(app);

describe('Login/Logout API', () => {
  let user;
  describe('Login API', () => {
    it('should login user', (done) => {
      server
        .post('/users/login')
        .send({ email: 'oyendah@gmail.com', password: 'password' })
        .end((err, res) => {
          user = res.body;
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('User authenticated successfully');
          done();
        });
    });

    it('logged in user should have a token', (done) => {
      expect(user.token).toExist();
      done();
    });

    it('should return Wrong Password login user', (done) => {
      server
        .post('/users/login')
        .send({ email: 'oyendah@gmail.com', password: '123456' })
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual(
            'Authentication failed. Wrong password.');
          done();
        });
    });

    it('should not authorize a user without a token', (done) => {
      server
        .get('/users')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          done();
        });
    });
  });

  describe('Invalid Login', () => {
    it('should not login user with invalid email', (done) => {
      server
        .post('/users/login')
        .send({ email: 'hello@yahoo.com', password: '12345' })
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual(
            'Authentication Failed. User not found.');
          done();
        });
    });

    it('should not authenticate user', (done) => {
      server
        .post('/users/login')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual(
            'Authentication Failed. User not found.');
          done();
        });
    });

    it('should not authenticate user without password', (done) => {
      server
        .post('/users/login')
        .send({ email: 'oyendah@gmail.com' })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual(
            'Error occurred while authenticating user');
          done();
        });
    });
  });

  describe('Logout API', () => {
    it('Should return a message on logout', (done) => {
      server
        .post('/users/logout')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('You have successfully logged out');
          done();
        });
    });
  });
});
