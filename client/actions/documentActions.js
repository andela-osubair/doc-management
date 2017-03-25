import * as types from './actionTypes';
import axios from 'axios';

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function loadDocumentSuccess(document) {
  return {type: types.LOAD_DOCUMENT_SUCCESS, document};
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function createDocumentSuccess(document){
  return{
    type: types.CREATE_DOCUMENT_SUCCESS,
    document
  }
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {any} document
 */
export function updateDocumentSuccess(document){
  return{
    type: types.UPDATE_DOCUMENT_SUCCESS,
    document
  }
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns {any} document id
 */
export function setCurrentDocument(id){
  return{
    type: types.SET_CURRENT_DOCUMENT,
    id
  }
}

/**
 *
 *
 * @export
 * @returns {object} documents
 */
export function loadUserDocument(){
  return function (dispatch, getState) {
    return axios.get(
      `/users/${getState().auth.user.data.id}/documents`).then((res)=>{
        dispatch(loadDocumentSuccess(res.data.doc));
      }). catch((err)=>{
        throw(err);
      })
  }
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */
export function saveDocument(document){
  return function (dispatch) {
    return axios.post('/documents/', document).then(()=>{
      dispatch(loadUserDocument());
    }). catch((err)=>{
      throw(err);

    })
  }
}

/**
 *
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */
export function updateDocument(document){
  return function (dispatch, getState) {
    const documentId = getState().manageDocuments.selectedDocument;
    return axios.put(`/documents/${documentId}`, document).then(()=>{
      dispatch(loadUserDocument());
    }). catch((err)=>{
      throw(err);

    })
  }
}

/**
 *
 *
 * @export
 * @param {any} id
 * @returns {object} documents
 */
export function deleteDocument(id){
  return function (dispatch) {
    return axios.delete(`/documents/${id}`).then(()=>{
      dispatch(loadUserDocument());
    }). catch((err)=>{
      throw(err);

    })
  }
}