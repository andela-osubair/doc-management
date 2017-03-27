import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
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
  return { type: types.CREATE_USER_SUCCESS, user };
}

/**
 *  create user failure
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */
export function getUserSuccess(name) {
  return { type: types.GET_USER_SUCCESSS, name };
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
      token
    }
  };
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
  };
}

/**
 *
 *
 * @export saveUser
 * @param {any} user
 * @returns {Object} json object
 */
export function saveUser(user) {
  return (dispatch) => {
    return axios.post('/users', user)
    .then((res) => {
      const token = res.data.token;
      dispatch(createUserSuccess(res.data.newUser));
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(jwtDecode(token)));
    }).catch((error) => { throw (error); });
  };
}

/**
 *
 *
 * @export saveUser
 * @param {any} id
 * @returns {Object} json object
 */
export function getUser(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}`)
    .then((res) => {
      dispatch(getUserSuccess(res.data.user.name));
    }).catch((error) => { throw (error); });
  };
}

/**
 *
 *
 * @export
 * @param {any} identifier
 * @returns {objeect} uuser
 */
export function isUserExists(identifier) {
  return (dispatch) => {
    return axios.get(`/api/users/${identifier}`);
  };
}

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {any} data
 */
export function login(user) {
  return (dispatch) => {
    return axios.post('/users/login', user.user).then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(jwtDecode(token)));
    }).catch((error) => { throw (error); });
  };
}

/**
 *
 *
 * @export
 * @returns {any} data
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}
