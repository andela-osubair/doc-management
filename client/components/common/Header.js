import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';
import SearchModal from '../search/SearchModal';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.handleSearchModal = this.handleSearchModal.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this
      .props
      .logout();
  }

  handleSearchModal(e) {
    e.preventDefault();
    $('#modal2').modal('open');
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <ul>
        <li>
          <a onClick={this.handleSearchModal}>
          <i className="material-icons">search</i></a>
        </li>
        <li activeClassName="active">
          <a href="#">Hello, {
              isAuthenticated ? this.props.auth.user.data.name : 'Guest'
            }!</a>
        </li>
        <li activeClassName="active">
          <Link to="/">Dashboard</Link>
        </li>
        <li activeClassName="active">
          <Link to="/document">My Documents</Link>
        </li>
        <li>
          <a href="#" onClick={this.logout}>Logout</a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li activeClassName="active">
          <Link to="/signup">Sign up</Link>
        </li>
      </ul>
    );
    return (
      <div>
      <nav className="pink darken-3">
        <div className="nav-wrapper">
          <div className="navheader">
            <Link to="/" className="brand-logo">Doc Management</Link>
          </div>
          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              {isAuthenticated
                ? userLinks
                : guestLinks}
            </li>
          </ul>
          <ul id="mobile-demo" className="side-nav">
            <li>
              {isAuthenticated
                ? userLinks
                : guestLinks}
            </li>
          </ul>
        </div>
      </nav>
        <SearchModal/>
      </div>
    );
  }
}

Header.propTypes = {
  auth: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns {any} data
 */
function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { logout })(Header);
