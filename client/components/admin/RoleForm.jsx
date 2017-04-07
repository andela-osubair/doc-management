import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as roleActions from '../../actions/roleActions';
import { addFlashMessage } from '../../actions/flashMessages';

class RoleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: {},
      titleValue: Object.assign({}, props.roleValue).title,
    };

    this.onChange = this.onChange.bind(this);
    this.saveRole = this.saveRole.bind(this);
    this.updateRole = this.updateRole.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.roleValue.id !== nextProps.roleValue.id) {
      // Necessary to populate form when existing documents loaded directly.
      this.setState({
        titleValue: Object.assign({}, nextProps.roleValue).title
      });
    }
  }

  onChange(e) {
    e.preventDefault();
    const field = e.target.name;
    const role = this.state.role;
    role[field] = e.target.value;
    this.setState({ role, titleValue: e.target.value });
  }

  saveRole(e) {
    e.preventDefault();
    this.props.actions.saveRole(this.state.role).then(() => {
      toastr.success('Role Successfully Saved');
    });
  }

  updateRole(e) {
    e.preventDefault();
    this.props.actions.updateRole(this.state.role).then(() => {
      toastr.success('Role Updated Successfully');
    });
  }

  render() {
    const hasValue = this.props.currentRole;
    const form = (
      <div className="col s12 z-depth-5 card-panel">
        <form>
        <div className="row">
        <div className="input-field col s12">
          <input
            type="text"
            id="title"
            name="title"
            value={this.state.titleValue}
            placeholder="role title"
            className="validate"
            onChange={this.onChange}
            />
            <label htmlFor="title" className="active">Title</label>
            </div>
        <div className="input-field col s12">
        <input
          id="btnSave"
          type="submit"
          value="Save"
          className="btn waves-effect waves-light pink darken-1"
          onClick={hasValue ? this.updateRole : this.saveRole}/>
          </div>
          </div>
        </form>
      </div>
    );
    return (<div> {form} </div>);
  }
}

RoleForm.propTypes = {
  auth: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func,
  roleValue: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  currentRole: PropTypes.string,
  addFlashMessage: React.PropTypes.func.isRequired
};

/**
 *
 *
 * @param {any} roles
 * @param {any} id
 * @returns {any} object
 */
function getRoleById(roles, id) {
  const role = roles.filter((rl) => {
    return String(rl.id) === id;
  });
  if (role) {
    return role[0];
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
  const currentState = state.manageRoles;
  const roleId = state.currentlySelected.selectedRole;
  let role = {
    id: '',
    title: '',
  };
  if (roleId > 0) {
    role = getRoleById(currentState.roles, roleId);
  }
  return {
    roleValue: role,
    auth: state.auth
  };
}

/**
 *
 *
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(roleActions, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleForm);
