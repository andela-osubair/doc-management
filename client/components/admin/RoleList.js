import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { bindActionCreators } from 'redux';
import * as roleActions from '../../actions/roleActions';
import { addFlashMessage } from '../../actions/flashMessages';


class RoleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0
    };
    this.editRole = this.editRole.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }

  editRole(e) {
    e.preventDefault();
    const roleId = e.target.id;
    this.props.actions.setCurrentRole(roleId);
  }
  deleteRole() {
    const roleId = this.state.id;
    this.props.actions.deleteRole(roleId)
    .then(() => toastr.success('Role Successfully Deleted'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to delete role' });
      toastr.error(
        'Unable to delete role');
    });
    this.setState({ id: 0 });
  }

  renderAlert(e) {
    e.preventDefault();
    let id = this.state.id;
    id = e.target.id;
    this.setState({ show: true, id });
    this.props.swal({
      title: 'Warning!',
      text: 'Are you sure?',
      type: 'info',
      showCancelButton: true,
      onConfirm: this.deleteRole,
      onCancel: this.props.close,
    });
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
              <li onClick={this.renderAlert}>
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
        <ReduxSweetAlert />
      </div>
    );
  }

}

RoleList.propsTypes = {
  actions: PropTypes.object.isRequired,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
};

/**
 *
 * dispatch role actions
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(roleActions, dispatch),
    swal: bindActionCreators(swal, dispatch),
    close: bindActionCreators(close, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(RoleList);
