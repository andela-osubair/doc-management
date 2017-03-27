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
export default function userReducer(state = initialState.manageUsers, action) {
  switch (action.type) {
  case types.CREATE_USER_SUCCESS:
    return [
      ...state,
      Object.assign({}, { users: action.user })
    ];

  case types.GET_USER_SUCCESSS:
    return [
      ...state,
      Object.assign({}, { owner: action.name })
    ];

  default:
    return state;
  }
}
