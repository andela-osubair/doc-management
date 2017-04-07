import axios from 'axios';
import types from './actionTypes';


/**
 * searchUserSuccess method
 * @param  {object} user user reponse from api call
 * @return {object}      action type and action payload
 */
export function searchUsersSuccess(user) {
  return {
    type: types.SEARCH_ALLUSERS_SUCCESS,
    user
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
 * search user function, GET function
 * @param  {String} term   search term
 * @param  {number} limit  limit of records to be returned
 * @param  {numebr} offset offset of user data
 * @return {object}        reponse from the api
 */
export function searchUser(term, limit, offset) {
  return (dispatch) => {
    return axios.get(`/search/users/?term=${term}
      &limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch(searchUsersSuccess(res.data));
    });
  };
}

/**
 * search user function, GET function
 * @param  {String} term   search term
 * @param  {number} limit  limit of records to be returned
 * @param  {numebr} offset offset of user data
 * @return {object}        reponse from the api
 */
export function searchDocuments(term, limit, offset) {
  return (dispatch) => {
    return axios.get(`/search/users/?term=${term}
      &limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch(searchUsersSuccess(res.data));
    });
  };
}
