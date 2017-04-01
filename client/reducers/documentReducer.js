import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * [documentReducer description]
 * @param  {[type]} [state=initialState.manageDocuments] [description]
 * @param  {[type]} action                               [description]
 * @return {[type]}                                      [description]
 */
export default function documentReducer(
  state = initialState.manageDocuments, action) {
  switch (action.type) {
  case types.LOAD_DOCUMENT_SUCCESS:
    return Object.assign({}, ...state, { documents: action.document });

  case types.CREATE_DOCUMENT_SUCCESS:
    return [
      ...state,
      Object.assign({}, { documents: action.document })
    ];

  case types.SET_CURRENT_DOCUMENT:
    return Object.assign({}, state, { selectedDocument: action.id });

  case types.DELETE_CURRENT_DOCUMENT: {
    const newState = JSON.parse(JSON.stringify(state));
    delete newState.selectedDocument;
    return newState;
  }

  case types.UPDATE_DOCUMENT_SUCCESS:
    return [
      ...state.filter(document => document.id !== action.document.id),
      Object.assign({}, { documents: action.document })
    ];

  default:
    return state;
  }
}
