import axios from 'axios';
import jwtDecode from 'jwt-decode';
import types from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * loadUserSuccess,
 * action dispatched on getting a user records from db
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
 * loadAllUsersSuccess
 * action dispatched on getting all users records from db
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
 * setCurrentUser
 *
 * @export
 * @param {any} user selected user data
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
 * add to state the currently selected user
 * @export
 * @param {any} id
 * @returns {any} user id
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
 * @return {object} object of action
 */
export function displaySelectedUser(id) {
  return {
    type: types.DISPLAY_SELECT_USER,
    id
  };
}

/**
 * remove from state the currently selected user
 * @return {object} action [description]
 */
export function deleteSelectedUser() {
  return {
    type: types.DELETE_SELECTED_USER,
  };
}

/**
 * action dispatched on creating new user success
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */
export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

/**
 *  action dispatched on creating new user failure
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
 *  login users action dispatch on success authentication
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
 *  login users failure
 *  dispatch on login failure
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
 * create new user using api route
 * POST /users/
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
 * load users from the database using api route setting limit and offset
 * GET /users/?limit=%offset=
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
 * load users from the database using api route setting limit and offset
 * GET /users/
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
 * get currently authenticated user using parameter user id
 * GET /users/:id
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
 * user update with admin authentication
 * PUT /users/:id
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
 * user update by account owner
 * GET /users/:id
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
 *create a new user by admin
 *POST /users/
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
 * get selected user details
 * GET /users/:id
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
 * isUserExists to check if passed parameter already exist in the db
 * using the route GET /api/users/:identifier
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
 * login user function
 * set user token to local storage on successfull login
 * and set headers for authorization
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
 * logout user and clear token from localStorage
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
