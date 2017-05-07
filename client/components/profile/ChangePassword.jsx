import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import TextInput from '../common/TextInput.jsx';
import * as userActions from '../../actions/userActions';
import { addFlashMessage } from '../../actions/flashMessages';
import SubmitButton from '../common/SubmitButton.jsx';
import CancelButton from '../common/CancelButton.jsx';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      errors: {},
      password: '',
      confirmPassword: ''
    };
    this.onChange = this.onChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.clearError = this.clearError.bind(this);
    this.confirmPasswordMatch = this.confirmPasswordMatch.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    const field = event.target.name;
    const user = this.state.user;
    if (field === 'password') {
      const value = event.target.value;
      user[field] = value;
      this.setState({ user, password: value });
    }
    if (field === 'confirmPassword') {
      this.setState({ confirmPassword: event.target.value });
    }
  }

  confirmPasswordMatch(event) {
    event.preventDefault();
    const field = event.target.name;
    const val = event.target.value;
    const errors = this.state.errors;
    let invalid;
    if (val !== '') {
      if (this.state.password !== this.state.confirmPassword) {
        errors[field] = 'Password does not match ';
        invalid = true;
      } else {
        errors[field] = '';
        invalid = false;
      }
      this.setState({ errors, invalid });
    }
  }

  updateUser(event) {
    event.preventDefault();
    if (!this.isFormValid()) {
      return;
    }
    this.props.actions.updateUserAdmin(this.state.user, this.props.user.id)
    .then(() => {
      toastr.success('Password Changed Successfully');
    }).catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to change password' });
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

  clearError(event) {
    const field = event.target.name;
    const errors = this.state.errors;

    errors[field] = '';
    const invalid = false;
    this.setState({ errors, invalid });
  }
  render() {
    const { errors } = this.state;

    const form = (
      <div className="col s12 z-depth-5 card-panel">
        <form className="login-form">
          <h5 className="center-align">Change Password</h5>
          <div className="row margin">
            <TextInput
              type="password"
              name="password"
              value={this.state.password}
              placeholder="password"
              icon="lock"
              onChange={this.onChange}
              clearError={this.clearError}
              error={errors.password}/>
          </div>
          <div className="row margin">
            <TextInput
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              placeholder="confirm password"
              icon="lock"
              onBlur={this.confirmPasswordMatch}
              onChange={this.onChange}
              clearError={this.clearError}
              error={errors.confirmPassword}/>
          </div>
          <div className="row">
            <div className="input-field">
              <SubmitButton type="submit" value="Save"
                onClick={this.updateUser}/>
              <CancelButton onClick={this.props.cancelClick} />
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


ChangePassword.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  cancelClick: PropTypes.func.isRequired
};

/**
 * mapDispatchToProps
 * @param  {function} dispatch dispatchs actions
 * @return {object}          [description]
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ChangePassword);
