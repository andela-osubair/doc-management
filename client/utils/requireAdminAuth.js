import React from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';

/**
 *
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this
          .props
          .addFlashMessage({
            type: 'error', text: 'You need to login to access this page' });
        this
          .context
          .router
          .push('/login');
      }
      if (this.props.isAuthenticated && this.props.isAdmin !== 1) {
        this
          .props
          .addFlashMessage({
            type: 'error',
            text: 'You need to be an Admin to access this page' });
        this
          .context
          .router
          .push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this
          .context
          .router
          .push('/login');
      }
    }

    render() {
      return (<ComposedComponent {...this.props}/>);
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isAdmin: React.PropTypes.number.isRequired
  };

  Authenticate.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

/**
 *
 *
 * @param {any} state
 * @returns {boolean}
 */
  function mapStateToProps(state) {
    let admin;
    if (state.auth.isAuthenticated) {
      admin = state.auth.user.data.roleId;
    }
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isAdmin: admin
    };
  }

  return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}
