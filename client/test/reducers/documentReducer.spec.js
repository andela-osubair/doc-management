/* eslint no-unused-expressions: "off"*/
import expect from 'expect';
import documentReducer from '../../../client/reducers/documentReducer';
import * as actions from '../../../client/actions/documentActions';
import currentlySelectedReducer from
'../../../client/reducers/currentlySelectedReducers';

describe('Document Reducer', () => {
  it('should add documents to states when passed LOAD_DOCUMENT_SUCCESS',
  (done) => {
    const initialState = {
      manageDocuments: { documents: [] }
    };
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

  it('should add new document to state when passed CREATE_DOCUMENT_SUCCESS',
  (done) => {
    const initialState = {
      manageDocuments: { documents: [
        {
          id: 1,
          title: 'test reducer document',
          docContent: 'testreduce content',
          userId: 2,
          role: 'private',
        }
      ] }
    };
    // arrange
    const documents = {
      id: 2,
      title: 'test reducer document',
      docContent: 'testreduce content',
      userId: 2,
      role: 'private',
    };

    const action = actions.createDocumentSuccess(documents);
    // act
    const newState = documentReducer(initialState.manageDocuments, action);
    // assert
    expect(newState.length).toEqual(2);
    expect(newState[0].title).toEqual('test reducer document');
    done();
  });

  it('should add selected documentid to state when passed SET_CURRENT_DOCUMENT',
  (done) => {
    const initialState = {
      manageDocuments: { documents: [] }
    };
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
    const newState = currentlySelectedReducer(
      initialState.currentlySelected, action);
    // assert
    expect(newState.selectedDocument).toBeTruthy;
    expect(newState.selectedDocument).toEqual('2');
    done();
  });

  it('should remove selected document from state'
  + ' when passed DELETE_CURRENT_DOCUMENT',
  (done) => {
    const initialState = {
      manageDocuments: { documents: [
        {
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
        }
      ] }
    };

    let action;
    let newState;
    action = actions.setCurrentDocument(
      initialState.manageDocuments.documents[1].id);
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
