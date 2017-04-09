/**
 * Documents action, disptach action and
 * action types of each action to the reducer
 */

import axios from 'axios';
import types from './actionTypes';

/**
 *
 * loaddocumentsuccess
 * @export
 * @param {any} documents  returned documents from api call
 * @returns {any} action and action types
 */
export function loadDocumentSuccess(documents) {
  return { type: types.LOAD_DOCUMENT_SUCCESS, documents };
}

/**
 * create new document success action
 *
 * @export
 * @param {any} document newly create document reponse from api post
 * @returns {any} action and action types
 */
export function createDocumentSuccess(document) {
  return {
    type: types.CREATE_DOCUMENT_SUCCESS,
    document
  };
}

/**
 *
 * dispatch to reducer the selected document
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
 *
 * disptch to reducer the currently displayed document details
 * @export
 * @param {any} id
 * @returns {any} document id
 */
export function displayCurrentDocument(id) {
  return {
    type: types.DISPLAY_SELECTED_DOCUMENT,
    id
  };
}

/**
 * delete from state the currently selected document
 * @return {[type]} [description]
 */
export function deleteCurrentDocument() {
  return {
    type: types.DELETE_CURRENT_DOCUMENT,
  };
}

/**
 * get user documents from database
 * by calling api route /user/:id/alldocuments
 *
 * @export
 * @returns {object} documents
 */
export function loadUserDocument() {
  return (dispatch, getState) => {
    return axios.get(
      `users/${getState().auth.user.data.id}/alldocuments`).then((res) => {
        dispatch(loadDocumentSuccess(res.data));
      });
  };
}

/**
 * get all document from data base with admin authentication
 * using api route /documents
 *
 * @export
 * @returns {object} documents
 */
export function loadAllDocument() {
  return (dispatch) => {
    return axios.get('documents').then((res) => {
      dispatch(loadDocumentSuccess(res.data));
    });
  };
}

/**
 * save new documents to database using POST api route /documents/
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */
export function saveDocument(document) {
  return (dispatch) => {
    return axios.post('/documents/', document).then(() => {
      dispatch(loadUserDocument());
    });
  };
}

/**
 * update documents to database using PUT api route /documents/:id
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */
export function updateDocument(document) {
  return (dispatch, getState) => {
    const documentId = getState().currentlySelected.selectedDocument;
    return axios.put(`/documents/${documentId}`, document).then(() => {
      dispatch(loadUserDocument());
    });
  };
}

/**
 * delete document from database using DELETE api route /documents/:id
 *
 * @export
 * @param {any} id
 * @returns {object} documents
 */
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`).then(() => {
      dispatch(loadUserDocument());
    });
  };
}
