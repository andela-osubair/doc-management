import { agent } from 'supertest';
import expect from 'expect';

import app from '../../../bin/www';
import newData from '../helper/test-helper';

process.env.NODE_ENV = 'test';

// This agent refers to PORT where program is runninng.
const server = agent(app);
const newDoc = newData.publicDoc;
const regUser = newData.docUser;

describe('Document API', () => {
  let docData;
  let regUserData;
  let updatedDoc;

  before((done) => {
    server
      .post('/users')
      .send(regUser)
      .end((err, res) => {
        regUserData = res.body;
        newDoc.userId = regUserData.newUser.id;
        done();
      });
  });

  describe('Create Document', () => {
    it('should create new document', (done) => {
      server
        .post('/documents')
        .set('x-access-token', regUserData.token)
        .send(newDoc)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          docData = res.body;
          expect(res.status).toEqual(201);
          expect(res.body.message).toEqual(
            'Document created successfully.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/GET Documents', () => {
    it('should 401 for unautorized user without token', (done) => {
      server
        .get('/documents')
        .end((err, res) => {
          expect(res.status).toEqual(401);
          if (err) return done(err);
          done();
        });
    });

    it('should return document with specified id', (done) => {
      server
        .get(`/documents/${docData.document.id}`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual(docData.document.title);
          if (err) return done(err);
          done();
        });
    });
    it('should return Document Not Found for invalid document Id', (done) => {
      server
        .get('/documents/99910')
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.message).toEqual('Document Not Found');
          if (err) return done(err);
          done();
        });
    });
    it('should return documents the specified user', (done) => {
      server
        .get(`/users/${regUserData.newUser.id}/documents`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          if (err) return done(err);
          done();
        });
    });
  });
  describe('/PUT update document', () => {
    const fieldsToUpdate = {
      title: 'Newly Updated Document',
    };
    it('should update document data ', (done) => {
      server
        .put(`/documents/${docData.document.id}`)
        .set('x-access-token', regUserData.token)
        .send(fieldsToUpdate)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          updatedDoc = res.body;
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('Document updated successfully');
          if (err) {
            done(err);
          }
          done();
        });
    });
  });

  describe('/DELETE user data', () => {
    it('should delete user data ', (done) => {
      server
        .delete(`/documents/${docData.document.id}`)
        .set('x-access-token', regUserData.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual(
            `${updatedDoc.updatedDoc.title}, was successfully deleted`);
          if (err) return done(err);
          done();
        });
    });
  });
});
