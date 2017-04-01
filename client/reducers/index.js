import { combineReducers } from 'redux';
import { reducer } from 'react-redux-sweetalert';
import manageUsers from './userReducer';
import flashMessages from './flashReducer';
import auth from './auth';
import manageDocuments from './documentReducer';
import manageRoles from './roleReducer';

const rootReducer = combineReducers({
  manageUsers,
  flashMessages,
  auth,
  manageDocuments,
  manageRoles,
  sweetalert: reducer,
});

export default rootReducer;
