import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import TextInput from '../common/TextInput.jsx';
import * as userActions from '../../actions/userActions';
import { addFlashMessage } from '../../actions/flashMessages';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}, // Object.assign({}, props.userValue),
      errors: {},
      fullname: Object.assign({}, props.userValue).name,
      username: Object.assign({}, props.userValue).username,
      email: Object.assign({}, props.userValue).email,
      select: Object.assign({}, props.userValue).roleId,
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  componentDidMount() {
    // $('#mySelectBox').on('change', this.updateSelectState);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userValue.id !== nextProps.userValue.id) {
      // Necessary to populate form when existing documents loaded directly.

      this.setState({
        fullname: Object.assign({}, nextProps.userValue).name,
        username: Object.assign({}, nextProps.userValue).username,
        email: Object.assign({}, nextProps.userValue).email,
        select: Object.assign({}, nextProps.userValue).roleId
      });
    }
  }

  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    const value = event.target.value;
    user[field] = event.target.value;
    if (field === 'name') {
      this.setState({ fullname: value });
    } else if (field === 'email') {
      this.setState({ email: value });
    } else if (field === 'username') {
      this.setState({ username: value });
    } else if (field === 'roleId') {
      this.setState({ select: value });
    }
    this.setState({ user });
  }

  saveUser(e) {
    e.preventDefault();
    this.props.actions.saveUserAdmin(this.state.user).then(() => {
      toastr.success('User Added Successfully');
    }).catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to add new user' });
      toastr.error(
        'Unable to add new user');
    });
  }

  updateUser(e) {
    e.preventDefault();
    const userId = this.props.selectedUser;
    this.props.actions.updateUserAdmin(this.state.user, userId).then(() => {
      toastr.success('User Updated Successfully');
    }).catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to update user' });
      toastr.error(
        'Unable to update user');
    });
  }

  isFormValid() {
    let formIsValid = true;
    const errors = {};
    if (this.state.user.password.length < 5) {
      errors.password = 'Password must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({ errors });
    return formIsValid;
  }

  clearError(e) {
    const field = e.target.name;
    const errors = this.state.errors;

    errors[field] = '';
    const invalid = false;
    this.setState({ errors, invalid });
  }
  render() {
    const { errors } = this.state;
    const { selectedUser } = this.props;
    const hasValue = this.props.selectedUser;

    const form = (
      <div className="col s12 z-depth-5 card-panel">
        <form className="login-form">
          <div className="row margin">
            <TextInput
              type="text"
              name="name"
              value={this.state.fullname}
              placeholder="fullname"
              icon="person_outline"
              onChange={this.onChange}
              error={errors.name}/>
          </div>
          <div className="row margin">
            <TextInput
              type="text"
              name="username"
              value={this.state.username}
              placeholder="username"
              icon="person"
              onChange={this.onChange}
              clearError={this.clearError}
              error={errors.username}/>
          </div>
          <div className="row margin">
            <TextInput
              type="email"
              name="email"
              value={this.state.email}
              placeholder="email"
              icon="email"
              onChange={this.onChange}
              clearError={this.clearError}
              error={errors.email}/>
          </div>
          {selectedUser ? '' :
            <div className="row margin">
              <TextInput
                type="password"
                name="password"
                placeholder="password"
                icon="lock"
                onChange={this.onChange}
                clearError={this.clearError}
                error={errors.email}/>
            </div>
          }
          <div className="row margin">
          <label>User Role</label>
          <div className="input-field col s12">
            <select name="roleId" id="mySelectBox"
            value={this.state.select}
            className="browser-default" onChange={this.onChange}>
            <option value="" disabled >User Role</option>
            {this.props.allRoles.map(role =>
               (<option key={role.id}
              value={role.id}>{role.title}</option>)
            )
            }
          </select>
          </div>
          </div>
          <div className="row">
            <div className="input-field">
              <input
                type="submit"
                value="Save"
                className="btn waves-effect waves-light pink darken-1"
                onClick={hasValue ? this.updateUser : this.saveUser}/>
            </div>
          </div>
        </form>
      </div>
    );
    return (
      <div>
      {form}
      </div>
    );
  }
}


UserForm.propTypes = {
  allRoles: PropTypes.array.isRequired,
  userValue: PropTypes.object.isRequired,
  updateUser: PropTypes.func,
  actions: PropTypes.object.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  selectedUser: PropTypes.string
};

/**
 *
 *
 * @param {any} allusers
 * @param {any} id
 * @returns {any} object
 */
function getUserById(allusers, id) {
  const users = allusers.filter((user) => {
    return String(user.id) === id;
  });
  if (users) {
    return users[0];
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
  const userId = state.currentlySelected.selectedUser;
  let user = {
    id: '',
    name: '',
    username: '',
    email: '',
    roleId: ''
  };
  if (userId > 0) {
    user = getUserById(currentState.allUsers, userId);
  }
  return {
    selectedUser: userId,
    userValue: user,
    auth: state.auth
  };
}

/**
 * [mapDispatchToProps description]
 * @param  {fuction} dispatch [description]
 * @return {object}          [description]
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
