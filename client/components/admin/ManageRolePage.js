/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RoleList from './RoleList';
import * as roleActions from '../../actions/roleActions';
import RoleForm from './RoleForm';

class ManangeRolePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { viewForm: false };

    this.closeClick = this.closeClick.bind(this);
    this.openFormClick = this.openFormClick.bind(this);
  }
  componentWillMount() {
    this.props.actions.loadRoles();
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  closeClick() {
    this.props.actions.deleteCurrentRole();
    this.setState({ viewForm: false });
  }

  openFormClick() {
    this.setState({ viewForm: true });
    this.props.actions.deleteCurrentRole();
  }

  renderRoleForm() {
    if (this.props.currentRole) {
      return (
        <div>
          <div>
            <a onClick={this.closeClick}
              className="btn-floating pink closeModal">
              <i className="material-icons">close</i></a>
          </div>
          <h6>Update Role</h6>
          <RoleForm />
        </div>
      );
    }
  }

  render() {
    const { allRoles, currentRole } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <div className="col s12 z-depth-5 card-panel card-body">
              <div className="fixed-action-btn" onClick={this.openFormClick}>
                <a
      className="btn-floating btn-large waves-effect waves-light red tooltipped"
        data-position="left" data-delay="50"
        data-tooltip="create new role"
        >
                  <i className="material-icons">add</i>
                </a>
              </div>
              <h4>All Roles</h4>
            <div className="row">
                <div className="col s6">
                <RoleList allRoles={allRoles} />
                </div>
                <div className="col s6">
                  {this.state.viewForm ?
                    <div>
                      <div>
                        <a onClick={this.closeClick}
                          className="btn-floating pink closeModal">
                          <i className="material-icons">close</i></a>
                      </div>
                      <h6>Add New Role</h6>
                      <RoleForm currentRole={currentRole} />
                    </div>
                     :
                      this.renderRoleForm()}
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

ManangeRolePage.propTypes = {
  allRoles: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  currentRole: PropTypes.string
};

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  const currentState = state.manageRoles;
  const allRoles = currentState.roles;
  return {
    allRoles,
    currentRole: currentState.selectedRole
  };
}

/**
 *
 * dispatch document actions
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(roleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManangeRolePage);
