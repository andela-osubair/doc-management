import supertest from 'supertest';
import expect from 'expect';

import app from '../../../bin/www';
import newData from '../helper/test-helper';

process.env.NODE_ENV = 'test';


// This agent refers to PORT where program is runninng.

const server = supertest.agent(app);
const role = newData.newRole;
const adminUser = newData.administrator;
const regUser = newData.regular;

describe('Roles API', () => {
  let userData;
  let regData;
  let roleData;

  before((done) => {
    server
      .post('/users')
      .send(regUser)
      .end((err, res) => {
        regData = res.body;
        done();
      });
  });
  describe('Create Role', () => {
    before((done) => {
      server
        .post('/users')
        .send(adminUser)
        .end((err, res) => {
          userData = res.body;
          done();
        });
    });
    it('should create new role', (done) => {
      server
        .post('/roles')
        .set('x-access-token', userData.token)
        .send(role)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          roleData = res.body;
          expect(res.body.message).toEqual('Role created succesfully');
          expect(res.status).toEqual(201);
          if (err) return done(err);
          done();
        });
    });

    it('should not create role without admin access', (done) => {
      server
        .post('/roles')
        .set('x-access-token', regData.token)
        .send(role)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.message).toEqual(
            'User is unauthorized for this request.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/GET Role', () => {
    it('should return 200 for role endpoint', (done) => {
      server
        .get('/roles')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });
    it('should return administrator for role id 1', (done) => {
      server
        .get('/roles/1')
        .set('x-access-token', userData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.role.title).toEqual('administrator');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/PUT Role', () => {
    const fieldsToUpdate = {
      title: 'normal',
    };
    it('should update rola data ', (done) => {
      server
        .put(`/roles/${roleData.role.id}`)
        .set('x-access-token', userData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Role updated successfully.');
          if (err) return done(err);
          done();
        });
    });

    it(
      'should return Not authorize when user other than the admin updates role',
      (done) => {
        server
          .put(`/roles/${roleData.role.id}`)
          .set('x-access-token', regData.token)
          .send(fieldsToUpdate)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual(
              'User is unauthorized for this request.');
            if (err) return done(err);
            done();
          });
      });

    describe('/DELETE Role', () => {
      it('should delete user data ', (done) => {
        server
          .delete(`/roles/${roleData.role.id}`)
          .set('x-access-token', userData.token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Role deleted successfully.');
            if (err) return done(err);
            done();
          });
      });

      it(
        'should return Not Authorize when user other than admin tries to delete another user', (done) => {
          server
          .delete('/roles/1')
          .set('x-access-token', regData.token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).toEqual(403);
            expect(res.body.message).toEqual(
              'User is unauthorized for this request.');
            if (err) return done(err);
            done();
          });
        });
    });
  });
});
