/* eslint no-unused-expressions: "off"*/

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
          expect(res.body.message).toEqual(
            'User authenticated successfully');
          done();
        });
    });
    it('logged in user should have a token', () => {
      expect(user.token).to.exist;
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
          expect(res.status).to.equal(401);
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
  });
  describe('Logout API', () => {

  });
});
