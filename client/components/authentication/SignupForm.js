import React from 'react';
import {Link} from 'react-router';
import TextInput from '../common/TextInput';

const SignupForm = ({user, onSave, onChange, saving, errors}) => {
  return (
    <div className="col s12 z-depth-5 card-panel">
      <form className="login-form">
        <div className="row margin">
          <TextInput
          type="text"
            name="name"
            label="fullname"
            icon="person_outline"
            value={user.name}
            onChange={onChange}
            error={errors.name}/>
        </div>
        <div className="row margin">
          <TextInput
          type="text"
            name="username"
            label="username"
            icon="person"
            value={user.username}
            onChange={onChange}
            error={errors.username}/>
        </div>
        <div className="row margin">
          <TextInput
          type="text"
            name="email"
            label="email"
            icon="email"
            value={user.email}
            onChange={onChange}
            error={errors.email}/>
        </div>
        <div className="row margin">
          <TextInput
          type="password"
            name="password"
            label="password"
            icon="lock"
            value={user.password}
            onChange={onChange}
            error={errors.password}/>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="submit"
              className="btn waves-effect waves-light col s12 pink darken-1"
              disabled={saving}
              value={saving
              ? 'Saving...'
              : 'Sign Up'}
              onClick={onSave}/>
          </div>
          <div className="input-field col s12">
            <p className="margin center medium-small sign-up">
              Already have an account?
              <Link to="/"> Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

SignupForm.propTypes = {
 user: React.PropTypes.object,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default SignupForm;
