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
});
