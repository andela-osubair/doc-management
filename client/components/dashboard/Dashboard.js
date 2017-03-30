/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { loadUserDocument,
  loadAllDocument } from '../../actions/documentActions';
import PublicDodumentList from '../document/PublicDocumentList';
import RoleDocumentList from '../document/RoleDocumentList';
import PrivateDocumentList from '../document/PrivateDocumentList';


/**
 * HomePage Component
 */
class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPrivate: false
    };
  }

  componentWillMount() {
    if (this.props.auth.user.data.roleId === 1) {
      this.props.loadAllDocument();
      this.setState({ isPrivate: true });
    } else {
      this.props.loadUserDocument();
    }
  }
  /**
 * React Render
 * @return {object} html
 */
  render() {
    const { publicDocuments, roleDocuments, privateDocuments } = this.props;
    return (
      <div className="row">
        <div className="col s12">
          <div className="col s12 z-depth-5 card-panel">
            <h4>DASHBOARD</h4>
              <div className="container">
                <h6>All Public Documents</h6>
                <PublicDodumentList
                  publicDocuments={publicDocuments} />
                <br />
                <div className="divider"></div>
                <h6>All Accessible Role Documents</h6>
                <RoleDocumentList roleDocuments={roleDocuments} />
                  <br />
                    <div className="divider"></div>
                {this.state.isPrivate ?

                  <h6>All Private Documents</h6> : ''}
                <PrivateDocumentList privateDocuments={privateDocuments}/>
              </div>
          </div>
        </div>
      </div>
    );
  }

}

DashboardPage.propsTypes = {
  publicDocuments: PropTypes.object.isRequired,
  privateDocuments: PropTypes.object.isRequired,
  roleDocuments: PropTypes.object.isRequired,
  loadUserDocument: PropTypes.func.isRequired,
  loadAllDocument: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};


/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  const currentState = state.manageDocuments;
  let roleDocuments = [];
  let privateDocuments = [];
  const publicDocuments = currentState.documents.filter(
      doc => doc.viewAccess === 'public');
  if (state.auth.isAuthenticated && state.auth.user.data.roleId !== 1) {
    roleDocuments = currentState.documents.filter(
            doc => doc.role === String(state.auth.user.data.roleId));
  } else if (state.auth.isAuthenticated
    && state.auth.user.data.roleId === 1) {
    roleDocuments = currentState.documents.filter(
            doc => doc.viewAccess === 'role');
    privateDocuments = currentState.documents.filter(
                    doc => doc.viewAccess === 'private');
  }


  return {
    publicDocuments,
    auth: state.auth,
    roleDocuments,
    privateDocuments
  };
}


export default connect(mapStateToProps, { loadUserDocument, loadAllDocument })(DashboardPage);
