import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 *
 *
 * @export
 * @param {any} [state=initialState.courses]
 * @param {any} action
 * @returns {object} user object
 */
export default function documentReducer(
  state = initialState.manageDocuments, action)
{
  switch (action.type) {
  case types.LOAD_DOCUMENT_SUCCESS:
    return Object.assign({}, ...state, {documents : action.document})
  case types.SET_CURRENT_DOCUMENT:
    return Object.assign({}, state, {selectedDocument: action.id});
  default:
    return state;
  }
}