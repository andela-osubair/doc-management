/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserList from './UserList';
import * as userActions from '../../actions/userActions';
import * as roleActions from '../../actions/roleActions';
import UserViewPage from './UserViewPage';
import UserForm from './UserForm';
import UserSearchList from './UserSearchList';

class ManageUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewForm: false,
      search: false,
      userSearchResult: [],
      value: ''
    };
    this.addUser = this.addUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearSearchResult = this.clearSearchResult.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUsers(5, 0);
    if (this.props.allRoles.length === 0) {
      this.props.roleAction.loadRoles();
    }
  }

  addUser(e) {
    e.preventDefault();
    this.props.actions.deleteSelectedUser();
    this.setState({ viewForm: true });
  }

  onChange(e) {
    e.preventDefault();
    const value = e.target.value;
    let searchResult;
    if (value.trim() !== '') {
      value.toLowerCase();
      searchResult = this.props.allUsers.filter((user) => {
        const username = user.username.toLowerCase();
        const email = user.email.toLowerCase();
        return email.includes(value) || username.includes(value);
      });
      this.setState({
        userSearchResult: searchResult,
        value,
        search: true });
    }
  }

  clearSearchResult() {
    this.setState({ value: '', search: false });
  }

  renderUserDetails() {
    return (
      <div>
        <h6>User Details</h6>
        <UserViewPage />
      </div>
    );
  }

  renderUserForm() {
    if (this.props.selectedUser) {
      const { allRoles } = this.props;
      return (
        <div>
          <h6>Update User Details</h6>
          <UserForm allRoles={allRoles}/>
        </div>
      );
    }
  }

  render() {
    const { allUsers, allRoles,
      selectedUser, userDetails, pageCount } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="col s12 z-depth-5 card-panel card-body">
              <div className="fixed-action-btn">
                <a onClick={this.addUser}
      className="btn-floating btn-large waves-effect waves-light red tooltipped"
        data-position="left" data-delay="50"
        data-tooltip="create new role"
        >
                  <i className="material-icons">add</i>
                </a>
              </div>
              <h4>All Users</h4>
            <div className="row">
                <div className="col s6">
                  <div className="row">
                      <form className="col s12">
                        <div className="row">
                          <div className="input-field col s12">
                            <i className="material-icons prefix">search</i>
                            <input
                              id="icon_prefix"
                              type="text"
                              value={this.state.value}
                              className="validate"
                              onChange={this.onChange}
                               />
                            <label htmlFor="icon_prefix">search users</label>
                          </div>
                          {this.state.search ?
                            <input type="submit" value="Clear"
                  className="btn waves-effect waves-light pink darken-1 right"
                  onClick={this.clearSearchResult}
                          /> : ''}
                        </div>
                      </form>
                    </div>
                    {this.state.search ?
                      <div>
                    <h6 id="searchResult">
                      Result for "{this.state.value}" user </h6>
                      <UserSearchList
                        userSearchResult={this.state.userSearchResult}/>
                    </div>
                    : <UserList allUsers={allUsers}
                    pageCount = {pageCount}
                     />}
                </div>
                <div className="col s6">
                {selectedUser && userDetails ? this.renderUserDetails() :
                  this.state.viewForm ? <div>
                    <h6>Add New User</h6>
                    <UserForm allRoles={allRoles}/>
                  </div> : this.renderUserForm()
                }

                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

ManageUserPage.propTypes = {
  allUsers: PropTypes.array.isRequired,
  allRoles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  roleAction: PropTypes.object.isRequired,
  selectedUser: PropTypes.string,
  userDetails: PropTypes.bool,
  pageCount: PropTypes.number
};

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  const currentState = state.manageUsers;
  const allRoles = state.manageRoles.roles;
  const allUsers = currentState.allUsers;
  const pageCount = currentState.pageCount;
  return {
    allUsers,
    allRoles,
    selectedUser: currentState.selectedUser,
    userDetails: currentState.userDetails,
    pageCount
  };
}

/**
 *
 * dispatch document actions
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
    roleAction: bindActionCreators(roleActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
