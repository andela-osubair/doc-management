import expect from 'expect';
import userReducer from '../../../client/reducers/userReducer';
import * as actions from '../../../client/actions/userActions';
import currentlySelectedReducer from
'../../../client/reducers/currentlySelectedReducers';

describe('User Reducer', () => {
  it('should add user when passed CREATE_USER_SUCCESS', (done) => {
    const initialState = {
      manageUsers: { allUsers: [], userDetails: false, authUser: [] }
    };
    // arrange
    const user = {
      name: 'test reducer',
      username: 'testreduce',
      email: 'testreduce@gmail.com',
      password: 'password',
      roleId: 2
    };

    const action = actions.createUserSuccess(user);

    // act
    const newState = userReducer(initialState.manageUsers, action);

    // assert
    expect(newState.length).toEqual(1);
    expect(newState[0].users.name).toEqual('test reducer');
    done();
  });

  it('should get user when passed GET_USERS_SUCCESS', (done) => {
    const initialState = {
      manageUsers: { allUsers: [], userDetails: false, authUser: [] }
    };

    const action = actions.getUserSuccess('Subair Oyindamola');

    // act
    const newState = userReducer(initialState.manageUsers, action);
    // assert
    expect(newState.length).toEqual(1);
    expect(newState[0].owner).toEqual('Subair Oyindamola');
    done();
  });

  it('should load users when passed LOAD_USERS_SUCCESS', (done) => {
    const initialState = {
      manageUsers: { allUsers: [], userDetails: false, authUser: [] }
    };
    // arrange
    const data = { user: [{
      name: 'test reducer',
      username: 'testreduce',
      email: 'testreduce@gmail.com',
      password: 'password',
      roleId: 2
    },
    {
      name: 'test user',
      username: 'usertest',
      email: 'usere@gmail.com',
      password: 'password',
      roleId: 2
    }],
      pageMeta: {
        limit: 1,
        offset: 0,
        total_count: 2
      } };

    const action = actions.loadUserSuccess(data);

    // act
    const newState = userReducer(initialState.manageUsers, action);
    // assert
    expect(newState.allUsers.length).toEqual(2);
    expect(newState.allUsers[0].name).toEqual('test reducer');
    expect(newState.allUsers[1].name).toEqual('test user');
    done();
  });

  it('should set selected users when passed SET_SELECTED_USER', (done) => {
    const initialState = {
      manageUsers: { allUsers: [], userDetails: false, authUser: [] }
    };
    // arrange
    const user = [{
      id: 1,
      name: 'test reducer',
      username: 'testreduce',
      email: 'testreduce@gmail.com',
      password: 'password',
      roleId: 1
    }, {
      id: 2,
      name: 'test user',
      username: 'usertest',
      email: 'usere@gmail.com',
      password: 'password',
      roleId: 2
    }];

    const action = actions.setSelectedUser(user[0].id);

    // act
    const newState = currentlySelectedReducer(initialState.manageUsers, action);

    // assert
    expect(newState.selectedUser).toEqual(1);
    done();
  });

  it('should set userDetails to true when passed DISPLAY_SELECT_USER',
  (done) => {
    const initialState = {
      manageUsers: { allUsers: [], userDetails: false, authUser: [] }
    };
    // arrange
    const user = [{
      id: 1,
      name: 'test reducer',
      username: 'testreduce',
      email: 'testreduce@gmail.com',
      password: 'password',
      roleId: 1
    }, {
      id: 2,
      name: 'test user',
      username: 'usertest',
      email: 'usere@gmail.com',
      password: 'password',
      roleId: 2
    }];

    const action = actions.displaySelectedUser(String(user[0].id));

    // act
    const newState = userReducer(initialState.manageUsers, action);

    // assert
    expect(newState.userDetails).toEqual(true);
    done();
  });

  it('should get user when passed DELETE_SELECTED_USER', (done) => {
    const initialState = {
      manageUsers: { allUsers: [], userDetails: false, authUser: [] }
    };
    // arrange
    const user = [{
      id: 1,
      name: 'test reducer',
      username: 'testreduce',
      email: 'testreduce@gmail.com',
      password: 'password',
      roleId: 1
    }, {
      id: 2,
      name: 'test user',
      username: 'usertest',
      email: 'usere@gmail.com',
      password: 'password',
      roleId: 2
    }];
    let newState;
    let action;
    action = actions.setSelectedUser(user[0].id);

    newState = currentlySelectedReducer(initialState.manageUsers, action);
    expect(newState.selectedUser).toEqual(1);

    action = actions.deleteSelectedUser(user[0].id);

    // act
    newState = currentlySelectedReducer(initialState.manageUsers, action);
    // assert
    expect(newState.selectedUser).toNotExist();
    done();
  });
});
