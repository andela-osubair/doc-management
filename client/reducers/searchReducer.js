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
    return Object.assign({}, ...state, {
      searchedUsers: action.user.user,
      searchedPageCount: Math.ceil(action.user.pageMeta.total_count /
           action.user.pageMeta.limit) });

  case types.SEARCH_ALLDOCUMENTS_SUCCESS:
    return Object.assign({}, ...state, {
      searchedUsers: action.documents.document,
      searchedPageCount: Math.ceil(action.documents.pageMeta.total_count /
                    action.documents.pageMeta.limit) });
  default:
    return state;
  }
}
