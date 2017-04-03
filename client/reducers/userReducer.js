import isEmpty from 'lodash/isEmpty';
import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 *
 *
 * @export
 * @param {any} [state=initialState.courses]
 * @param {any} action
 * @returns {object} user object
 */
export default function userReducer(state = initialState.manageUsers, action) {
  switch (action.type) {
  case types.CREATE_USER_SUCCESS:
    return [
      ...state,
      Object.assign({}, { users: action.user })
    ];

  case types.GET_USER_SUCCESS:
    return [
      ...state,
      Object.assign({}, { owner: action.name })
    ];

  case types.LOAD_USER_SUCCESS:
    return Object.assign({}, ...state, { allUsers: action.user });

  case types.SET_SELECTED_USER:
    return Object.assign({}, state, { selectedUser: action.id });

  case types.DISPLAY_SELECT_USER:
    return Object.assign({}, state, { userDetails: !isEmpty(action.id) });

  case types.DELETE_SELECTED_USER: {
    const newState = JSON.parse(JSON.stringify(state));
    delete newState.selectedUser;
    return newState;
  }

  default:
    return state;
  }
}
