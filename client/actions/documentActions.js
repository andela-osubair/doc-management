import axios from 'axios';
import * as types from './actionTypes';

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function loadDocumentSuccess(document) {
  return { type: types.LOAD_DOCUMENT_SUCCESS, document };
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function createDocumentSuccess(document) {
  return {
    type: types.CREATE_DOCUMENT_SUCCESS,
    document
  };
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function updateDocumentSuccess(document) {
  return {
    type: types.UPDATE_DOCUMENT_SUCCESS,
    document
  };
}

/**
 *
 * set in state the selcted document
 * @export
 * @param {any} id
 * @returns {any} document id
 */
export function setCurrentDocument(id) {
  return {
    type: types.SET_CURRENT_DOCUMENT,
    id
  };
}

/**
 * delete from state the current selected document
 * @return {[type]} [description]
 */
export function deleteCurrentDocument() {
  return {
    type: types.DELETE_CURRENT_DOCUMENT,
  };
}

/**
 *
 *
 * @export
 * @returns {object} documents
 */
export function loadUserDocument() {
  return (dispatch, getState) => {
    return axios.get(
      `users/${getState().auth.user.data.id}/alldocuments`).then((res) => {
        dispatch(loadDocumentSuccess(res.data));
      }).catch((err) => {
        throw (err);
      });
  };
}

/**
 *
 *
 * @export
 * @returns {object} documents
 */
export function loadAllDocument() {
  return (dispatch) => {
    return axios.get('documents').then((res) => {
      dispatch(loadDocumentSuccess(res.data));
    }).catch((err) => {
      throw (err);
    });
  };
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */
export function saveDocument(document) {
  return (dispatch) => {
    return axios.post('/documents/', document).then(() => {
      dispatch(loadUserDocument());
      // dispatch(createDocumentSuccess(res.data.document));
    }).catch((err) => {
      throw (err);
    });
  };
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */
export function updateDocument(document) {
  return (dispatch, getState) => {
    const documentId = getState().manageDocuments.selectedDocument;
    return axios.put(`/documents/${documentId}`, document).then(() => {
      dispatch(loadUserDocument());
      // dispatch(updateDocumentSuccess(res.data.updatedDoc));
    }).catch((err) => {
      throw (err);
    });
  };
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns {object} documents
 */
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`).then(() => {
      dispatch(loadUserDocument());
    }).catch((err) => {
      throw (err);
    });
  };
}
