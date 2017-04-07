import React, { PropTypes } from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import ReactPaginate from 'react-paginate';
import { addFlashMessage } from '../../actions/flashMessages';
import * as userActions from '../../actions/userActions';
import * as searchActions from '../../actions/searchActions';

class UserSearchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      offset: 0,
      limit: 10
    };

    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.viewUser = this.viewUser.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  viewUser(e) {
    e.preventDefault();
    const userId = e.target.id;
    this.props.actions.setSelectedUser(userId);
    this.props.actions.displaySelectedUser(userId);
  }

  editUser(e) {
    e.preventDefault();
    const userId = e.target.id;
    this.props.actions.setSelectedUser(userId);
    this.props.actions.displaySelectedUser();
  }
  deleteUser() {
    const userId = this.state.id;
    this.props.actions.deleteUser(userId)
    .then(() => toastr.success('User Successfully Deleted'))
    .catch(() => {
      this.props.addFlashMessage({
        type: 'error',
        text: 'Unable to delete user' });
      toastr.error(
        'Unable to delete user');
    });
    this.setState({ id: 0 });
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.limit);

    this.setState({ offset }, () => {
      this.props.searchAction.searchUser(
        this.props.value, this.state.limit, offset);
    });
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
      onConfirm: this.deleteUser,
      onCancel: this.props.close,
    });
  }

  render() {
    return (
      <div>
      {this
        .props
        .searchedUsers
        .map(user => <div id="card-alert" className="card white"
        key={user.id}>
          <div className="card-content pink-text">
            {user.name} - {user.email}
          </div>
          <div className="fixed-action-btn horizontal click-to-toggle edit">
            <a className="btn-floating pink tooltipped"
              data-position="top" data-delay="50"
              data-tooltip="click to view more"
              >
              <i className="material-icons">more_vert</i>
            </a>
            <ul>
            <li onClick={this.viewUser} className="editDoc">
              <a
              className="btn-floating pink tooltipped"
              data-position="bottom" data-delay="50"
              data-tooltip="edit document">
                <i id={user.id} className="material-icons">view_list</i>
              </a>
            </li>
              <li onClick={this.editUser} className="editDoc">
                <a
                className="btn-floating pink tooltipped"
                data-position="bottom" data-delay="50"
                data-tooltip="edit document">
                  <i id={user.id} className="material-icons">mode_edit</i>
                </a>
              </li>
              <li onClick={this.renderAlert}>
                <a className="btn-floating red darken-1 tooltipped"
                  data-position="bottom" data-delay="50"
                  data-tooltip="delete document"
                  >
                  <i id={user.id} className="material-icons">delete</i>
                </a>
              </li>
            </ul>
          </div>
        </div>)}
        <ReactPaginate previousLabel={'previous'}
                       nextLabel={'next'}
                       breakLabel={<a href="">...</a>}
                       breakClassName={'break-me'}
                       pageCount={this.props.searchedPageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={'pagination'}
                       subContainerClassName={'pages pagination'}
                       pageClassName={'waves-effect'}
                       activeClassName={'active'} />
        <ReduxSweetAlert />
      </div>
    );
  }
}

UserSearchList.propTypes = {
  actions: PropTypes.object.isRequired,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  searchedUsers: PropTypes.array.isRequired,
  searchedPageCount: PropTypes.number,
  value: PropTypes.string,
  searchAction: PropTypes.object.isRequired,
};

/**
 *
 * dispatch role actions
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
    swal: bindActionCreators(swal, dispatch),
    close: bindActionCreators(close, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch),
    searchAction: bindActionCreators(searchActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(UserSearchList);
