/* eslint no-unused-expressions: "off"*/
import expect from 'expect';
import documentReducer from '../../../client/reducers/documentReducer';
import * as actions from '../../../client/actions/documentActions';
import initialState from '../../../client/reducers/initialState';

describe('Document Reducer', () => {
  it('should load documents when passed LOAD_DOCUMENT_SUCCESS', (done) => {
    // arrange
    const document = [{
      title: 'test reducer document',
      docContent: 'testreduce content',
      userId: 2,
      role: 'private',
    }, {
      title: 'test document on load success',
      docContent: 'document contents',
      userId: 1,
      role: 'private',
    }];

    const action = actions.loadDocumentSuccess(document);

    // act
    const newState = documentReducer(initialState.manageDocuments, action);
    // assert
    expect(newState.documents.length).toEqual(2);
    expect(newState.documents[0].title).toEqual('test reducer document');
    done();
  });

  it('should add document to  when passed CREATE_DOCUMENT_SUCCESS', (done) => {
    // arrange
    const document = {
      title: 'test reducer document',
      docContent: 'testreduce content',
      userId: 2,
      role: 'private',
    };

    const action = actions.createDocumentSuccess(document);

    // act
    const newState = documentReducer(initialState.manageDocuments, action);
    // assert
    expect(newState.length).toEqual(1);
    expect(newState[0].documents.title).toEqual('test reducer document');
    done();
  });

  it('should add selected document when passed SET_CURRENT_DOCUMENT',
  (done) => {
    // arrange
    const document = [{
      id: 1,
      title: 'test reducer document',
      docContent: 'testreduce content',
      userId: 2,
      role: 'private',
    }, {
      id: 2,
      title: 'test document on load success',
      docContent: 'document contents',
      userId: 1,
      role: 'private',
    }];

    const action = actions.setCurrentDocument(document[1].id);

    // act
    const newState = documentReducer(initialState.manageDocuments, action);
    // assert
    expect(newState.selectedDocument).toBeTruthy;
    expect(newState.selectedDocument).toEqual('2');
    done();
  });

  it('should add selected document when passed DELETE_CURRENT_DOCUMENT',
  (done) => {
    // arrange
    const document = [{
      id: 1,
      title: 'test reducer document',
      docContent: 'testreduce content',
      userId: 2,
      role: 'private',
    }, {
      id: 2,
      title: 'test document on load success',
      docContent: 'document contents',
      userId: 1,
      role: 'private',
    }];

    let action;
    let newState;
    action = actions.setCurrentDocument(document[1].id);
    newState = documentReducer(initialState.manageDocuments, action);
    expect(newState.selectedDocument).toBeTruthy;

    action = actions.deleteCurrentDocument();

    // act
    newState = documentReducer(initialState.manageDocuments, action);
    // assert
    expect(newState.selectedDocument).toNotExist();
    done();
  });
});
