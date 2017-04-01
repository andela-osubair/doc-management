/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserList from './UserList';
import * as userActions from '../../actions/userActions';
import * as roleActions from '../../actions/roleActions';
import UserViewPage from './UserViewPage';
import UserForm from './UserForm';

class ManageUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewForm: false
    };
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadUsers();
    if (this.props.allRoles.length === 0) {
      this.props.roleAction.loadRoles();
    }
  }

  addUser(e) {
    e.preventDefault();
    this.props.actions.deleteSelectedUser();
    this.setState({ viewForm: true });
  }

  renderUserDetails() {
    return (
      <div>
        <h6>User Details</h6>
        <UserViewPage />
      </div>
    );
    // if (this.props.selectedUser && this.props.userDetails) {
    //   return (
    //     <div>
    //       <h6>User Details</h6>
    //       <UserViewPage />
    //     </div>
    //   );
    // }
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

  renderDeleteDialog() {

  }

  render() {
    const { allUsers, allRoles, selectedUser, userDetails } = this.props;
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
                <UserList allUsers={allUsers} />
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
  userDetails: PropTypes.bool
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
  return {
    allUsers,
    allRoles,
    selectedUser: currentState.selectedUser,
    userDetails: currentState.userDetails
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
