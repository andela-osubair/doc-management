import expect from 'expect';
import userReducer from '../../../client/reducers/auth';
import * as actions from '../../../client/actions/userActions';
import initialState from '../../../client/reducers/initialState';

describe('Authentication Reducer', () => {
  it('should set Authenticated user when passed SET_CURRENT_USER', (done) => {
    const user = {
      email: 'oyendah@gmail.com',
      password: 'password'
    };
    const action = actions.setCurrentUser(user);

    // act
    const newState = userReducer(initialState, action);
    // assert

    expect(newState.isAuthenticated).toEqual(true);
    done();
  });
});
