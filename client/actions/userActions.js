import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {any} data
 */
export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

/**
 * createUserSuccess
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */
export function createUserSuccess(user) {
  return {type: types.CREATE_USER_SUCCESS, user};
}

/**
 *  create user failure
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */
export function createUserFailure() {
  return {type: types.CREATE_USER_FAILURE, };
}


/**
 *  login users
 *
 * @export
 * @param {any} token
 * @returns {Object} json object
 */
export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: type.LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

/**
 *  login users
 *
 * @export
 * @param {any} token
 * @returns {Object} json object
 */
export function loginUserFailure() {
  return {
    type: type.LOGIN_USER_FAILURE
  }
}

/**
 *
 *
 * @export saveUser
 * @param {any} user
 * @returns {Object} json object
 */
export function saveUser(user){
  return (dispatch) => {
    return axios.post('/users', user)
    .then(res => {
      const token = res.data.token;
      dispatch(createUserSuccess(res.data.newUser));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    }).catch(error => dispatch(createUserFailure(error)))
  }
}

/**
 *
 *
 * @export
 * @param {any} identifier
 * @returns {objeect} uuser
 */
export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {any} data
 */
export function login(user) {
  return dispatch => {
    return axios.post('/users/login', user.user).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    }).catch(error => dispatch(loginUserFailure(error)));
  }
}

/**
 *
 *
 * @export
 * @returns {any} data
 */
export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}