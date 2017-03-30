import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as roleActions from '../../actions/roleActions';


class RoleList extends React.Component {
  constructor(props) {
    super(props);
    this.editRole = this.editRole.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  editRole(e) {
    e.preventDefault();
    const roleId = e.target.id;
    this.props.actions.setCurrentRole(roleId);
  }
  deleteRole(e) {
    e.preventDefault();
    const roleId = e.target.id;
    const result = confirm('Do you want to delete this role?');
    if (result) {
      this.props.actions.deleteRole(roleId)
      .then(() => toastr.success('Document Successfully Deleted'));
    }
  }

  render() {
    return (
      <div>
      {this
        .props
        .allRoles
        .map(role => <div id="card-alert" className="card white"
        key={role.id}>
          <div className="card-content pink-text">
            {role.title}
          </div>
          <div className="fixed-action-btn horizontal click-to-toggle edit">
            <a className="btn-floating pink tooltipped"
              data-position="top" data-delay="50"
              data-tooltip="click to view more"
              >
              <i className="material-icons">more_vert</i>
            </a>
            <ul>
              <li onClick={this.editRole} className="editDoc">
                <a
                className="btn-floating pink tooltipped"
                data-position="bottom" data-delay="50"
                data-tooltip="edit document">
                  <i id={role.id} className="material-icons">mode_edit</i>
                </a>
              </li>
              <li onClick={this.deleteRole}>
                <a className="btn-floating red darken-1 tooltipped"
                  data-position="bottom" data-delay="50"
                  data-tooltip="delete document"
                  >
                  <i id={role.id} className="material-icons">delete</i>
                </a>
              </li>
            </ul>
          </div>
        </div>)}
      </div>
    );
  }

}

RoleList.propsTypes = {
  actions: PropTypes.object.isRequired,
  setCurrentRole: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired
};

/**
 *
 * dispatch role actions
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(roleActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(RoleList);
