import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import TextInput from '../common/TextInput.jsx';
import * as userActions from '../../actions/userActions';
import { addFlashMessage } from '../../actions/flashMessages';
import SubmitButton from '../common/SubmitButton.jsx';
import CancelButton from '../common/CancelButton.jsx';

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Object.assign({}, props.user),
      errors: {},
      fullname: Object.assign({}, props.user).name,
      username: Object.assign({}, props.user).username,
      email: Object.assign({}, props.user).email
    };
    this.onChange = this.onChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.clearError = this.clearError.bind(this);
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
    }
    this.setState({ user });
  }

  updateUser(event) {
    event.preventDefault();
    this.props.actions.updateUser(this.state.user, this.props.user.id)
    .then(() => { toastr.success('Profile Updated Successfully'); })
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to update profile' });
      toastr.error('Unable to update profile');
    });
  }

  clearError(event) {
    const field = event.target.name;
    const errors = this.state.errors;

    errors[field] = '';
    const invalid = false;
    this.setState({ errors, invalid });
  }
  render() {
    const { errors, fullname, username, email, } = this.state;
    const { cancelClick } = this.props;

    const form = (
      <div className="col s12 z-depth-5 card-panel">
        <form className="login-form">
          <h5 className="center-align">Update Profile</h5>
          <div className="row margin">
            <TextInput
              type="text"
              name="name"
              value={fullname}
              placeholder="fullname"
              icon="person_outline"
              onChange={this.onChange}
              error={errors.name}/>
          </div>
          <div className="row margin">
            <TextInput
              type="text"
              name="username"
              value={username}
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
              value={email}
              placeholder="email"
              icon="email"
              onChange={this.onChange}
              clearError={this.clearError}
              error={errors.email}/>
          </div>
          <div className="row">
            <div className="input-field">
              <SubmitButton type="submit" value="Save"
                onClick={this.updateUser}/>
              <CancelButton onClick={cancelClick} />
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

UpdateProfile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  cancelClick: PropTypes.func.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
const mapStateToProps = (state) => {
  const isAuthenticated = state.auth.isAuthenticated;
  return {
    isAuthenticated,
    auth: state.auth.user.data
  };
};

/**
 * mapdaispatchtoprops
 * @param  {function} dispatch dispatch fuction to actions
 * @return {object}          object to be dispatched
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
