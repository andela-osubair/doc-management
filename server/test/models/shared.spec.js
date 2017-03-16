/* eslint no-unused-expressions: "off"*/

import expect from 'expect';
import newData from '../helper/test-helper';
import model from '../../models';
import invalid from '../helper/invalid-data-helper';

process.env.NODE_ENV = 'test';

const Shared = model.Shared;
const Document = model.Documents;
const doc = newData.sharedDoc;
const sharedDoc = newData.shared;

describe('Document Model', () => {
  let docData;
  let sharedData;

  before((done) => {
    Document.create(doc)
      .then((newDoc) => {
        docData = newDoc;
        sharedDoc.userId = docData.id;
        done();
      });
  });

  describe('Create Document', () => {
    it('should share document', (done) => {
      Shared.create(sharedDoc)
        .then((shared) => {
          sharedData = shared;
          done();
        });
    });
    it('shared document data should exist', () => {
      expect(sharedData).toExist();
      expect(typeof sharedData).toEqual('object');
      expect(sharedData).toIncludeKeys('email');
    });
    it('created new document should have name, email', () => {
      expect(sharedData.email).toEqual(sharedDoc.email);
      expect(sharedData.documentId).toEqual(sharedDoc.documentId);
    });

    it('should share document with canEdit access set', () => {
      expect(sharedData.canEdit).toExist();
    });
  });

  describe('Shaed Model Validation', () => {
    it('requires email field to share a document with', (done) => {
      Shared.create(invalid.nullEmail)
        .catch((error) => {
          expect(/notNull Violation: email cannot be null/
            .test(error.message)).toBeTruthy;
          done();
        });
    });
    it('mail can not be empty', () => {
      Shared.create(invalid.emptyEmail)
        .catch((error) => {
          expect(/Validation error: Validation notEmpty failed/
            .test(error.message)).to.be.true;
          expect(/SequelizeValidationError/.test(error.name)).toBeTruthy;
        });
    });
  });
});
