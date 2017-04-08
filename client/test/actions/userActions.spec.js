import expect from 'expect';
import * as userActions from '../../../client/actions/userActions';
import types from '../../../client/actions/actionTypes';

// Test a sync action
describe('User Actions', () => {
  describe('createUserSuccess', () => {
    it('should create a CREATE_USER_SUCCESS action', (done) => {
      // arrange
      const user = {
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };
      const expectedAction = {
        type: types.CREATE_USER_SUCCESS,
        user
      };
      // act
      const action = userActions.createUserSuccess(user);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });
  describe('getUserSuccess', () => {
    it('should get user when passed GET_USERS_SUCCESS', (done) => {
      const newUser = {
        name: 'Subair Oyindamola',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };
      const name = 'Subair Oyindamola';
      const expectedAction = {
        type: types.GET_USERS_SUCCESS,
        name
      };

      const action = userActions.getUserSuccess(newUser.name);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('loadUserSuccess', () => {
    it('should load user, LOAD_USER_SUCCESS action', (done) => {
      // arrange
      const users = {
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };
      const expectedAction = {
        type: types.LOAD_USERS_SUCCESS,
        users
      };
      // act
      const action = userActions.loadUserSuccess(users);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('setCurrentUser', () => {
    it('should set current logged in user, SET_CURRENT_USER action', (done) => {
      // arrange
      const user = {
        id: 1,
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };

      const expectedAction = {
        type: types.SET_CURRENT_USER,
        user
      };
      // act
      const action = userActions.setCurrentUser(user);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('setSelectedUser', () => {
    it('should get selected user from list, SET_SELECTED_USER action',
    (done) => {
      // arrange
      const user = {
        id: 1,
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };
      const id = user.id;
      const expectedAction = {
        type: types.SET_SELECTED_USER,
        id
      };
      // act
      const action = userActions.setSelectedUser(user.id);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('displaySelectedUser', () => {
    it('should display details of selected user, DISPLAY_SELECT_USER action',
    (done) => {
      // arrange
      const user = {
        id: 1,
        name: 'test actions',
        username: 'testreduce',
        email: 'testreduce@gmail.com',
        password: 'password',
        roleId: 2
      };
      const id = user.id;
      const expectedAction = {
        type: types.DISPLAY_SELECT_USER,
        id
      };
      // act
      const action = userActions.displaySelectedUser(user.id);
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('deleteSelectedUser', () => {
    it('should delete in state the selected user, DISPLAY_SELECT_USER action',
    (done) => {
      const expectedAction = {
        type: types.DELETE_SELECTED_USER,
      };
      // act
      const action = userActions.deleteSelectedUser();
      // assert
      expect(action).toEqual(expectedAction);
      done();
    });
  });
});
