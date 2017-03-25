import { agent } from 'supertest';
import expect from 'expect';

import app from '../../../bin/www';
import newData from '../helper/test-helper';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
const server = agent(app);
const adminUser = newData.adminUser;
const regUser = newData.regUser;

describe('User API', () => {
  let userData;
  let regUserData;

  before((done) => {
    server
      .post('/users')
      .send(regUser)
      .end((err, res) => {
        regUserData = res.body;
        done();
      });
  });

  describe('Create User', () => {
    it('should create new user', (done) => {
      server
        .post('/users')
        .send(adminUser)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          userData = res.body;
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual('User created successfully');
          if (err) return done(err);
          done();
        });
    });
    it('should not create user with the same email', (done) => {
      server
        .post('/users')
        .send(adminUser)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.message).toEqual('User Already Exists');
          if (err) return done(err);
          done();
        });
    });
    it('should not create new user with empty params', (done) => {
      server
        .post('/users')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Error creating undefined');
          if (err) return done(err);
          done();
        });
    });

    it('should not create new user with empty email', (done) => {
      server
        .post('/users')
        .send({name: 'honey', password: 'password'})
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Error creating honey');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/GET User', () => {
    it('should 401 for unautorized user without token', (done) => {
      server
        .get('/users')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          if (err) return done(err);
          done();
        });
    });

    it('should return user when limit and offset are set', (done) => {
      server
        .get('/users/?limit=10&offset=1')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });
    it('should not return user when limit and offset are not set', (done) => {
      server
        .get('/users/')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          if (err) return done(err);
          done();
        });
    });

    it('should return user with specified id', (done) => {
      server
        .get(`/users/${userData.newUser.id}`)
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.user.email).toEqual(userData.newUser.email);
          if (err) return done(err);
          done();
        });
    });
    it('should not return user with invalid id', (done) => {
      server
        .get('/users/oyendah')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          if (err) return done(err);
          done();
        });
    });
    it('should return user with specified username or email', (done) => {
      server
        .get(`/api/users/${userData.newUser.username}`)
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.user.email).toEqual(userData.newUser.email);
          if (err) return done(err);
          done();
        });
    });
    it('should return 404 with specified username or email', (done) => {
      server
        .get('/api/users/Casandra')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('User Not Found');
          if (err) return done(err);
          done();
        });
    });
    it('should return User Not Found for invalid user Id', (done) => {
      server
        .get('/users/99910')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('User Not Found');
          if (err) return done(err);
          done();
        });
    });
  });
  describe('/PUT update user', () => {
    const fieldsToUpdate = {
      name: 'Subair Oyin',
    };
    it('should update user data ', (done) => {
      server
        .put(`/users/${userData.newUser.id}`)
        .set('x-access-token', userData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('User updated successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not update user data with invalid user id ', (done) => {
      server
        .put('/users/oyendah')
        .set('x-access-token', userData.token)
        .send({roleId: 100})
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Error updating user');
          if (err) return done(err);
          done();
        });
    });

    it('should not update user data with invalid id', (done) => {
      server
        .put('/users/100')
        .set('x-access-token', userData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('User Not Found');
          if (err) return done(err);
          done();
        });
    });

    it('should not update user data with invalid data', (done) => {
      server
        .put(`/users/${userData.newUser.id}`)
        .set('x-access-token', userData.token)
        .send({roleId: 10})
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Error updating user: Subair Oyin');
          if (err) return done(err);
          done();
        });
    });

    it('should return Not Authorized when user other than admin tries to update another user data ', (done) => {
      server
        .put(`/users/${userData.newUser.id}`)
        .set('x-access-token', regUserData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual('Not Authorized');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/DELETE user data', () => {
    it('should delete user data ', (done) => {
      server
        .delete(`/users/${userData.newUser.id}`)
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });

    it('should return user not found with invalid id', (done) => {
      server
        .delete('/users/100')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('User Not Found');
          if (err) return done(err);
          done();
        });
    });

    it('should return Not Authorize when user other than admin tries to delete another user', (done) => {
      server
        .delete('/users/1')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.message).toEqual('Not Authorized');
          if (err) return done(err);
          done();
        });
    });

    it('should not delete user data with invalid user id ', (done) => {
      server
        .delete('/users/oyendah')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.message).toEqual('Error deleting user');
          if (err) return done(err);
          done();
        });
    });
  });
});
