import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * documents reducers
 * @param  {object} state=initialState initial state of the application
 * @param  {any} action                 dispatched action fron the action
 * @return {object}                   return current state of the application
 */
export default function documentReducer(
  state = initialState.manageDocuments, action) {
  switch (action.type) {
  case types.LOAD_DOCUMENT_SUCCESS:
    return Object.assign({}, ...state, { documents: action.documents });

  case types.CREATE_DOCUMENT_SUCCESS:
    return [
      ...state,
      Object.assign({}, { documents: action.documents })
    ];

  default:
    return state;
  }
}
