import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class UserViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: Object.assign({}, props.userValue).name,
      username: Object.assign({}, props.userValue).username,
      email: Object.assign({}, props.userValue).email,
      roleId: Object.assign({}, props.userValue).roleId,
      createdAt: Object.assign({}, props.userValue).createdAt,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userValue.id !== nextProps.userValue.id) {
      // Necessary to populate form when existing documents loaded directly.
      this.setState({
        fullname: Object.assign({}, nextProps.userValue).name,
        username: Object.assign({}, nextProps.userValue).username,
        email: Object.assign({}, nextProps.userValue).email,
        roleId: Object.assign({}, nextProps.userValue).roleId,
        createdAt: Object.assign({}, nextProps.userValue).createdAt,
      });
    }
  }

  render() {
    return (
      <ul id = "profile-page-about-details"
      className = "collection z-depth-1" >
      <li className="collection-item">
          <div className="row">
            <div className="col s5 grey-text darken-1">
            <i className="mdi-action-wallet-travel"></i> Name</div>
            <div className="col s7 grey-text text-darken-4 right-align">
            {this.state.fullname}</div>
          </div>
        </li>
        <li className="collection-item">
            <div className="row">
              <div className="col s5 grey-text darken-1">
              <i className="mdi-action-wallet-travel"></i> Username</div>
              <div className="col s7 grey-text text-darken-4 right-align">
              {this.state.username}</div>
            </div>
          </li>
      <li className="collection-item">
          <div className="row">
            <div className="col s5 grey-text darken-1">
            <i className="mdi-action-wallet-travel"></i> Email Address</div>
            <div className="col s7 grey-text text-darken-4 right-align">
            {this.state.email}</div>
          </div>
        </li>
        <li className="collection-item">
            <div className="row">
              <div className="col s5 grey-text darken-1">
              <i className="mdi-action-wallet-travel"></i> Date Created</div>
              <div className="col s7 grey-text text-darken-4 right-align">
              {this.state.createdAt}</div>
            </div>
          </li>
      </ul>
    );
  }
}

UserViewPage.propTypes = {
  // auth: React.PropTypes.object.isRequired,
  userValue: PropTypes.object.isRequired,
  // actions: PropTypes.object.isRequired,
  // roles: PropTypes.array.isRequired,
  currentUser: PropTypes.string,
  // addFlashMessage: React.PropTypes.func.isRequired
};

/**
 *
 *
 * @param {any} users
 * @param {any} id
 * @returns {any} object
 */
function getUserId(users, id) {
  const user = users.filter((u) => {
    return String(u.id) === id;
  });
  if (user) {
    return user[0];
  } // since filter returns an array, have to grab the first.
  return null;
}

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  const currentState = state.manageUsers;
  const userId = currentState.selectedUser;
  let user = {
    id: '',
    name: '',
    username: '',
    email: '',
    roleId: '',
    createdAt: ''
  };
  if (userId > 0) {
    user = getUserId(currentState.allUsers, userId);
  }
  return {
    currentUser: currentState.selectedUser,
    userValue: user
  };
}

export default connect(mapStateToProps)(UserViewPage);
