import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * [roleReducer description]
 * @param  {object} [state=initialState.manageRoles] initial state
 * @param  {object} action                           action dispatched
 * @return {object}                                  [description]
 */
export default function roleReducer(state = initialState.manageRoles, action) {
  switch (action.type) {
  case types.LOAD_ROLE_SUCCESS:
    return Object.assign({}, ...state, { roles: action.roles });

  default:
    return state;
  }
}
