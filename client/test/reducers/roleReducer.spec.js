/* eslint no-unused-expressions: "off"*/
import expect from 'expect';
import roleReducer from '../../../client/reducers/roleReducer';
import * as actions from '../../../client/actions/roleActions';
import currentlySelectedReducer from
'../../../client/reducers/currentlySelectedReducers';
import initialState from '../../../client/reducers/initialState';

describe('Document Reducer', () => {
  it('should load roles when passed LOAD_ROLE_SUCCESS', (done) => {
    // arrange
    const roles = [{
      title: 'admin',
    }, {
      title: 'regular',
      docContent: 'document contents',
      userId: 1,
      role: 'private',
    }];

    const action = actions.loadRoleSuccess(roles);

    // act
    const newState = roleReducer(initialState.manageDocuments, action);
    // assert
    expect(newState.roles.length).toEqual(2);
    expect(newState.roles[0].title).toEqual('admin');
    done();
  });

  it('should add selected role to state when passed SET_CURRENT_ROLE',
  (done) => {
    // arrange
    const roles = [{
      id: 1,
      title: 'admin'
    }, {
      id: 2,
      title: 'user'
    }];

    const action = actions.setCurrentRole(roles[1].id);
    // act
    const newState = currentlySelectedReducer(
      initialState.currentlySelected, action);
    // assert
    expect(newState.selectedRole).toBeTruthy;
    expect(newState.selectedRole).toEqual('2');
    done();
  });

  it('should remove selected role from state when passed DELETE_CURRENT_ROLE',
  (done) => {
    // arrange
    const roles = [{
      id: 1,
      title: 'admin'
    }, {
      id: 2,
      title: 'user'
    }];

    let action;
    let newState;
    action = actions.setCurrentRole(roles[1].id);
    newState = currentlySelectedReducer(initialState.currentlySelected, action);
    expect(newState.selectedRole).toBeTruthy;

    action = actions.deleteCurrentRole();

    // act
    newState = currentlySelectedReducer(initialState.currentlySelected, action);
    // assert
    expect(newState.selectedRole).toNotExist();
    done();
  });
});
