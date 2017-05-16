/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import UserList from './UserList.jsx';
import * as userActions from '../../actions/userActions';
import * as roleActions from '../../actions/roleActions';
import * as searchActions from '../../actions/searchActions';
import UserViewPage from './UserViewPage.jsx';
import UserForm from './UserForm.jsx';
import UserSearchList from './UserSearchList.jsx';
import SubmitButton from '../common/SubmitButton.jsx';

class ManageUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewForm: false,
      search: false,
      showResult: false,
      userSearchResult: [],
      value: ''
    };
    this.addUser = this.addUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearSearchResult = this.clearSearchResult.bind(this);
    this.searchUserClick = this.searchUserClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUsers(10, 0);
    if (this.props.allRoles.length === 0) {
      this.props.roleAction.loadRoles();
    }
  }

  addUser(event) {
    event.preventDefault();
    this.props.actions.deleteSelectedUser();
    this.setState({ viewForm: true });
  }

  onChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  searchUserClick(event) {
    event.preventDefault();
    const value = this.state.value;
    if (value.trim() !== '') {
      this.props.searchAction.searchUsers(value, 10, 0).then(() => {
        this.setState({ value, search: true, showResult: true });
      }).catch(() => {
        toastr.error(
          'User not found');
      });
    } else {
      toastr.error(
        'search text field is empty, please enter a search term');
    }
  }

  clearSearchResult() {
    this.setState({ value: '', search: false });
  }

  renderUserDetails() {
    return (
      <div>
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
      selectedUser, userDetails, pageCount,
      searchedUsers, searchedPageCount
     } = this.props;
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
                             <label htmlFor="icon_prefix">
                               search with username or email</label>
                          </div>
                          {this.state.search ?
                            <SubmitButton type="submit" value="Clear"
                  onClick={this.clearSearchResult}
                          /> : <SubmitButton type="submit" value="Search"
                onClick={this.searchUserClick}/>
              }
                        </div>
                      </form>
                    </div>
                    {this.state.showResult ?
                      <div>
                    <h6 id="searchResult">
                      Result for "{this.state.value}" user </h6>
                      <UserSearchList
                        searchedUsers={searchedUsers}
                        searchedPageCount={searchedPageCount}
                        value={this.state.value}
                        />
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
  searchAction: PropTypes.object.isRequired,
  selectedUser: PropTypes.string,
  userDetails: PropTypes.bool,
  pageCount: PropTypes.number,
  searchedUsers: PropTypes.array.isRequired,
  searchedPageCount: PropTypes.number
};

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
const mapStateToProps = (state) => {
  const currentState = state.manageUsers;
  const allRoles = state.manageRoles.roles;
  const allUsers = currentState.allUsers;
  const pageCount = currentState.pageCount;
  const searchedUsers = state.manageSearch.searchedUsers;
  const searchedPageCount = state.manageSearch.searchedPageCount;
  return {
    allUsers,
    allRoles,
    searchedUsers,
    selectedUser: state.currentlySelected.selectedUser,
    userDetails: currentState.userDetails,
    pageCount,
    searchedPageCount
  };
};

/**
 *
 * dispatch document actions
 * @param {any} dispatch
 * @returns {any}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    roleAction: bindActionCreators(roleActions, dispatch),
    searchAction: bindActionCreators(searchActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
