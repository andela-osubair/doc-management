import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * search reducer
 * @param  {object} [state=initialState.manageSearch] [description]
 * @param  {object} action                           [description]
 * @return {object}                                  [description]
 */
export default function searchReducer(
  state = initialState.manageSearch, action) {
  switch (action.type) {
  case types.SEARCH_ALLUSERS_SUCCESS:
    return Object.assign({}, state, {
      searchedUsers: action.users.user,
      searchedPageCount: Math.ceil(action.users.pageMeta.total_count /
           action.users.pageMeta.limit) });

  case types.SEARCH_ALLDOCUMENTS_SUCCESS:
    return Object.assign({}, state, {
      searchedDocuments: action.documents.document,
      searchedPageCount: Math.ceil(action.documents.pageMeta.total_count /
           action.documents.pageMeta.limit) });
  default:
    return state;
  }
}
