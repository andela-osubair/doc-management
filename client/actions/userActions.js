import axios from 'axios';
import jwtDecode from 'jwt-decode';
import types from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * [loadUserSuccess description]
 * @param  {object} users user response fron api call in the thunk
 * @return {object}      reponse dispatched to reducer
 */
export function loadUserSuccess(users) {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
  };
}

/**
 * [loadAllUsersSuccess description]
 * @param  {object} users user response fron api call in the thunk
 * @return {object}      reponse dispatched to reducer
 */
export function loadAllUsersSuccess(users) {
  return {
    type: types.LOAD_ALLUSERS_SUCCESS,
    users
  };
}

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
 *
 * set in state the selcted role
 * @export
 * @param {any} id
 * @returns {any} role id
 */
export function setSelectedUser(id) {
  return {
    type: types.SET_SELECTED_USER,
    id
  };
}

/**
 * display details of current user
 * @param {number} id selected user id
 * @return {object} object of action type
 */
export function displaySelectedUser(id) {
  return {
    type: types.DISPLAY_SELECT_USER,
    id
  };
}

/**
 * delete from state the current selected role
 * @return {[type]} [description]
 */
export function deleteSelectedUser() {
  return {
    type: types.DELETE_SELECTED_USER,
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
 * @param {any} name
 * @returns {Object} json object
 */
export function getUserSuccess(name) {
  return { type: types.GET_USERS_SUCCESS, name };
}

/**
 * update user success
 * @param  {object} user updated user new details
 * @return {object}
 */
export function updateUserSuccess(user) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  };
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
    type: types.LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  };
}

/**
 * get authenticated user details
 * @param  {object} user
 * @return {object}
 */
export function getAuthUserSuccess(user) {
  return {
    type: types.GET_AUTH_USER_SUCCESS,
    user
  };
}

/**
 *  login users
 *
 * @export
 * @returns {Object} json object
 */
export function loginUserFailure() {
  return {
    type: types.LOGIN_USER_FAILURE
  };
}

/**
 *
 *
 * @export saveUser
 * @param {object} user
 * @returns {Object} api response
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
    });
  };
}


/**
 * [loadUsers description]
 * @param  {number} limit  [description]
 * @param  {number} offset [description]
 * @return {object}        [description]
 */
export function loadUsers(limit, offset) {
  return (dispatch) => {
    return axios.get(`/users?limit=${limit}&offset=${offset}`).then((res) => {
      dispatch(loadUserSuccess(res.data));
    });
  };
}

/**
 * [loadAllUser description]
 * @return {object} [all users]
 */
export function loadAllUsers() {
  return (dispatch) => {
    return axios.get('/users').then((res) => {
      dispatch(loadAllUsersSuccess(res.data.user));
    });
  };
}


/**
 * get user using parameter user id
 * @param  {number} id
 * @return {object}
 */
export function getAuthUser(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}`).then((res) => {
      dispatch(getAuthUserSuccess(res.data.user));
    });
  };
}

/**
 * user update by admin
 * @param  {object} user [user data object to update]
 * @param  {number} id   user id
 * @return {object}      [api response]
 */
export function updateUserAdmin(user, id) {
  return (dispatch) => {
    return axios.put(`/users/${id}`, user).then(() => {
      dispatch(loadUsers());
    });
  };
}

/**
 * user update by admin
 * @param  {object} user [user data object to update]
 * @param  {number} id   user id
 * @return {object}      [api response]
 */
export function updateUser(user, id) {
  return (dispatch) => {
    return axios.put(`/users/${id}`, user).then(() => {
      dispatch(getAuthUser(id));
    });
  };
}

/**
 *
 *
 * @export saveUser
 * @param {any} user
 * @returns {Object} json object
 */
export function saveUserAdmin(user) {
  return (dispatch) => {
    return axios.post('/users', user)
    .then(() => {
      dispatch(loadUsers());
    });
  };
}

/**
 *
 *
 * @export getUser
 * @param {any} id
 * @returns {Object} json object
 */
export function getUser(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}`)
    .then((res) => {
      dispatch(getUserSuccess(res.data.user.name));
    });
  };
}

/**
 *
 *
 * @export getUser
 * @param {any} id
 * @returns {Object} json object
 */
export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
    .then(() => {
      dispatch(loadUsers());
    });
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
  return () => {
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
    });
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
