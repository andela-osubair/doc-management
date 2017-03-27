import { combineReducers } from 'redux';
import manageUsers from './userReducer';
import flashMessages from './flashReducer';
import auth from './auth';
import manageDocuments from './documentReducer';

const rootReducer = combineReducers({
  manageUsers,
  flashMessages,
  auth,
  manageDocuments
});

export default rootReducer;
