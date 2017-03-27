/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { loadUserDocument } from '../../actions/documentActions';
import PublicDodumentList from '../document/PublicDocumentList';
import RoleDocumentList from '../document/RoleDocumentList';


/**
 * HomePage Component
 */
class DashboardPage extends React.Component {
  componentWillMount() {
    this.props.loadUserDocument();
  }
  /**
 * React Render
 * @return {object} html
 */
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="col s12 z-depth-5 card-panel">
            <h4>Dashboard</h4>
            <h6>All Public Documents</h6>
            <PublicDodumentList publicDocuments={this.props.publicDocuments} />
            <div className="divider"></div>
            <h6>All Accessible Role Documents</h6>
            <RoleDocumentList roleDocuments={this.props.roleDocuments} />
          </div>
        </div>
      </div>
    );
  }

}

DashboardPage.propsTypes = {
  publicDocuments: PropTypes.object.isRequired,
  roleDocuments: PropTypes.object.isRequired,
  loadUserDocument: PropTypes.func.isRequired
};


/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  const currentState = state.manageDocuments;
  const authUser = state.auth;
  const publicDocuments = currentState.documents.filter(
      doc => doc.viewAccess === 'public');
  const roleDocuments = currentState.documents.filter(
          doc => doc.role === String(authUser.user.data.roleId));

  return {
    publicDocuments,
    auth: state.auth,
    roleDocuments
  };
}


export default connect(mapStateToProps, { loadUserDocument })(DashboardPage);
