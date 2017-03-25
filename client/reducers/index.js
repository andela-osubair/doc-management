import { combineReducers } from 'redux';
import users from './userReducer';
import flashMessages from './flashReducer';
import auth from './auth';
import manageDocuments from './documentReducer';

const rootReducer = combineReducers({
  users,
  flashMessages,
  auth,
  manageDocuments
});

export default rootReducer;
