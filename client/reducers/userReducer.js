import isEmpty from 'lodash/isEmpty';
import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * user reducer
 * @param  {object} [state=initialState.manageUsers] initial state
 * @param  {object} action                           action to update state
 * @return {object} new state
 */
export default function userReducer(state = initialState.manageUsers, action) {
  switch (action.type) {
  case types.CREATE_USER_SUCCESS:
    return [
      ...state,
      Object.assign({}, { users: action.user })
    ];

  case types.GET_USERS_SUCCESS:
    return [
      ...state,
      Object.assign({}, { owner: action.name })
    ];

  case types.LOAD_USERS_SUCCESS:
    return Object.assign({}, ...state, {
      allUsers: action.users.user,
      pageCount: Math.ceil(action.users.pageMeta.total_count /
         action.users.pageMeta.limit) });

  case types.DISPLAY_SELECT_USER:
    return Object.assign({}, state, { userDetails: !isEmpty(action.id) });

  case types.GET_AUTH_USER_SUCCESS:
    return Object.assign({}, state, { authUser: action.user });


  default:
    return state;
  }
}
