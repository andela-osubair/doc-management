import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userProfilePic from '../home/images/user-gray.png';
import ListDetails from '../common/ListDetails.jsx';
import * as userActions from '../../actions/userActions';
import ChangePassword from './ChangePassword.jsx';
import UpdateProfile from './UpdateProfile.jsx';
import { addFlashMessage } from '../../actions/flashMessages';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Object.assign({}, props.user),
      edit: false,
      password: false,
      showDetails: true
    };
    this.editProfileClick = this.editProfileClick.bind(this);
    this.changePasswordClick = this.changePasswordClick.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.actions.getAuthUser(this.props.auth.id);
    }
  }

  editProfileClick(event) {
    event.preventDefault();
    this.setState({ edit: true, password: false, showDetails: false });
  }

  changePasswordClick(event) {
    event.preventDefault();
    this.setState({ password: true, showDetails: false, edit: false, });
  }

  cancelClick(event) {
    event.preventDefault();
    this.setState({ password: false, showDetails: true, edit: false, });
  }

  render() {
    const { user } = this.props;
    return (
    <div>
      <div className="row">
        <div className="col s12">
          <div className="ol s12 z-depth-5 card-panel">
            <div className="center-align">
              <img src={userProfilePic} className="responsive-img"/>
            </div>
            <div className="row">
              <div className="col s6 offset-s3">
                {this.state.showDetails ?
                <ListDetails
                fullname={user.name}
                username={user.username}
                email={user.email}
                createdAt={user.createdAt}
                showHeader
                onEditClick={this.editProfileClick}
                onChangeClick={this.changePasswordClick}
                /> : ''
              }
              {this.state.password ?
              <ChangePassword user={user}
                cancelClick={this.cancelClick}/> : ''
              }
              {this.state.edit ?
                <UpdateProfile user={user}
                  cancelClick={this.cancelClick}/> : ''
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

ProfilePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
};

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
const mapStateToProps = (state) => {
  const isAuthenticated = state.auth.isAuthenticated;
  let user = {};
  user = state.manageUsers.authUser;
  return {
    isAuthenticated,
    auth: state.auth.user.data,
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
