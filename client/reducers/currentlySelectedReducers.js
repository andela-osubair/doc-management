import initialState from './initialState';
import types from '../actions/actionTypes';

export default (state = initialState.currentlySelected, action) => {
  switch (action.type) {
  case types.SET_CURRENT_DOCUMENT:
    return Object.assign({}, state, { selectedDocument: action.id });

  case types.SET_CURRENT_ROLE:
    return Object.assign({}, state, { selectedRole: action.id });

  case types.SET_SELECTED_USER:
    return Object.assign({}, state, { selectedUser: action.id });

  case types.DELETE_CURRENT_DOCUMENT: {
    return Object.keys(state)
    .filter(key => key !== 'selectedDocument');
  }

  case types.DELETE_CURRENT_ROLE: {
    return Object.keys(state)
    .filter(key => key !== 'selectedRole');
  }

  case types.DELETE_SELECTED_USER: {
    return Object.keys(state)
    .filter(key => key !== 'selectedUser');
  }
  default: return state;
  }
};
