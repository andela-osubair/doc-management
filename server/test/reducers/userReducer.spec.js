import expect from 'expect';
import userReducer from '../../../client/reducers/userReducer';
import * as actions from '../../../client/actions/userActions';
import initialState from '../../../client/reducers/initialState';

describe('User Reducer', () => {
  it('should add user when passed CREATE_USER_SUCCESS', (done) => {
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

  // it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
  //   // arrange
  //   const initialState = [
  //     { id: 'A', title: 'A' },
  //     { id: 'B', title: 'B' },
  //     { id: 'C', title: 'C' }
  //   ];
  //
  //   const course = { id: 'B', title: 'New Title' };
  //   const action = actions.updateCourseSuccess(course);
  //
  //   // act
  //   const newState = courseReducer(initialState, action);
  //   const updatedCourse = newState.find(a => a.id == course.id);
  //   const untouchedCourse = newState.find(a => a.id == 'A');
  //
  //   // assert
  //   expect(updatedCourse.title).toEqual('New Title');
  //   expect(untouchedCourse.title).toEqual('A');
  //   expect(newState.length).toEqual(3);
  // });
});
