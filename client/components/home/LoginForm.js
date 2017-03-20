import React from 'react';
import {Link} from 'react-router';

const LoginForm = () => {
  return (
    <div className="col s12 z-depth-6 card-panel">
    <form className="login-form">
    <div className="row margin">
          <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input className="validate"
            type ="text"
            id="email"
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row margin">
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input id="password" type="password" className="validate"/>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m12 l12  login-text">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Link to="/login"
            className="btn waves-effect waves-light col s12 pink darken-1">
            Login</Link>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6 m6 l6">
            <p className="margin medium-small">
              <Link to="/signup">Sign Up</Link>
            </p>
          </div>
</div>
    </form>
    </div>
  );
};

LoginForm.propTypes = {
  course: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default LoginForm;
