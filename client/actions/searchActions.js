import axios from 'axios';
import types from './actionTypes';


/**
 * searchUserSuccess method
 * @param  {object} users user reponse from api call
 * @return {object}      action type and action payload
 */
export function searchUsersSuccess(users) {
  return {
    type: types.SEARCH_ALLUSERS_SUCCESS,
    users
  };
}

/**
 * searchDocumentSuccess method
 * @param  {object} documents documents reponse from api call
 * @return {object}      action type and action payload
 */
export function searchDocumentsSuccess(documents) {
  return {
    type: types.SEARCH_ALLDOCUMENTS_SUCCESS,
    documents
  };
}

/**
 * search user function,
 * GET /search/users/?term={term}
 * @param  {String} term   search term
 * @param  {number} limit  limit of records to be returned
 * @param  {numebr} offset offset of user data
 * @return {object}        reponse from the api
 */
export function searchUsers(term, limit, offset) {
  return (dispatch) => {
    return axios.get(
      `/search/users/?term=${term}&limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch(searchUsersSuccess(res.data));
    });
  };
}

/**
 * search document function,
 * GET /search/documents/?term={term}
 * @param  {String} term   search term
 * @param  {number} limit  limit of records to be returned
 * @param  {numebr} offset offset of document data
 * @return {object}        reponse from the api
 */
export function searchDocuments(term, limit, offset) {
  return (dispatch) => {
    return axios.get(
      `/search/documents/?term=${term}&limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch(searchDocumentsSuccess(res.data));
    });
  };
}
