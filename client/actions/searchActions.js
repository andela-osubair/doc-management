import axios from 'axios';
import types from './actionTypes';


/**
 * [searchUserSuccess description]
 * @param  {object} user [description]
 * @return {object}      [description]
 */
export function searchUserSuccess(user) {
  return {
    type: types.SEARCH_ALLUSERS_SUCCESS,
    user
  };
}

/**
 * [searchUser description]
 * @param  {[type]} user   [description]
 * @param  {[type]} limit  [description]
 * @param  {[type]} offset [description]
 * @return {[type]}        [description]
 */
export function searchUser(user, limit, offset) {
  return (dispatch) => {
    return axios.get(`/search/users/?q=${user}&limit=${limit}&offset=${offset}`)
    .then((res) => {
      dispatch(searchUserSuccess(res.data));
    });
  };
}
