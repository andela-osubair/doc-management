import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';

/**
 *  handle response
 *
 * @param {any} response
 * @returns {Object} json object
 */
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
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
export function createUserFailure(user) {
  return {type: types.CREATE_USER_FAILURE, user};
}


/**
 *  login users
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */
export function loginUserSuccess(user) {
  localStorage.setItem('token', user.token);
  return {
    type: type.LOGIN_USER_SUCCESS,
    payload: {
      token: user.token
    }
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
  console.log('useractions', user);

  return (dispatch) => {
    return fetch('/users', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => {
      console.log('users:', data);

      let decoded = jwtDecode(data.user.token);
      dispatch(createUserSuccess(data.user));
      dispatch(loginUserSuccess(data.user.token));
    });
  }
}
