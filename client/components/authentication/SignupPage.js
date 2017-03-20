import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {Link} from 'react-router';
import * as userActions from '../../actions/userActions';
import SignupForm from './SignupForm';
import toastr from 'toastr';

/**
 * HomePage Component
 */
export class SignupPage extends React.Component {

  /**
   * Creates an instance of SignupPage.
   * @param {any} props
   * @param {any} context
   *
   * @memberOf SignupPage
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: Object.assign({}, props.user),
      errors: {},
      saving: false,
      test: ''
    };
    this.saveUser = this
      .saveUser
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
  }

 /**
  *
  *
  * @param {any} event
  * @returns
  *
  * @memberOf SignupPage
  */
  onChange(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user, test: event.target.value});
    // return this.setState({user: event.target.value});
  }

  /**
 *
 *
 * @returns {boolean} true or false
 *
 * @memberOf SignupPage
 */
  signupFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.user.password.length < 5) {
      errors.password = 'Password must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }

  /**
   *
   *
   * @param {any} event
   *@return {boolean} false
   * @memberOf SignupPage
  */
  saveUser(event) {
    event.preventDefault();

    if (!this.signupFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    this
      .props
      .actions
      .saveUser(this.state.user)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  /**
   *
   *
   *@returns {any} new route
   * @memberOf SignupPage
   */
  redirect() {
    this.setState({saving: false});
    toastr.success('User Successfully Created');
    this
      .context
      .router
      .push('/dashboard');
  }
  /**
 * React Render
 * @return {object} html
 */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s3">
            <span className="flow-text center-align">Create an Account</span>
            <SignupForm
              onSave={this.saveUser}
              onChange={this.onChange}
              user={this.state.user}
              errors={this.state.errors}
              saving={this.state.saving}/>
              <input type="text" onChange={this.onChange} name="test"/>
              {this.props.test}
          </div>
        </div>
      </div>
    );
  }
}
SignupPage.propTypes = {
  user: PropTypes.object,
  actions: PropTypes.object.isRequired,
  test: PropTypes.string
};

// Pull in the React Router context so router is available on
// this.context.router.
SignupPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {user: state.user};
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
