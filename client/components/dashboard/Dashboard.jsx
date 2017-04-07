/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUserDocument,
  loadAllDocument } from '../../actions/documentActions';
import PublicDocumentList from '../document/PublicDocumentList.jsx';
import RoleDocumentList from '../document/RoleDocumentList.jsx';
import PrivateDocumentList from '../document/PrivateDocumentList.jsx';
import Modal from '../common/Modal.jsx';


/**
 * Dashboard Component
 */
class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPrivate: false
    };
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      if (this.props.auth.roleId === 1) {
        this.props.loadAllDocument().catch((err) => {
          if (err.response.data.status === 401 ||
            err.response.data.status === '401') {
            this.context.router.push('/login');
          }
        });
        this.setState({ isPrivate: true });
      } else {
        this.props.loadUserDocument().catch((err) => {
          if (err.response.data.status === 401 ||
            err.response.data.status === '401') {
            this.context.router.push('/login');
          }
        });
      }
    }
  }

  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });
    $('.dropdown-button').dropdown();
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'public');
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
          <div id="dashboardBG" className="col s12 z-depth-5 card-panel">
            <h4>DASHBOARD</h4>
              <div className="container">
                <div className="row">
                  <div className="col s12">
                    <ul
                      className="tabs tab-demo-active z-depth-1 pink darken-3">
                      <li className="tab col s3">
                      <a className="white-text waves-effect waves-light active"
                          href="#public">Public Documents</a>
                      </li>
                      <li className="tab col s3">
                        <a className="white-text waves-effect waves-light"
                          href="#role">Role Access Documents</a>
                      </li>
                      <li className="tab col s3">
                        <a className="white-text waves-effect waves-light"
                          href="#private">Private</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col s12">
                    <Modal />
                    <div id="public" className="col s12 tab-style">
                      <h6>All Public Documents</h6>
                      <PublicDocumentList
                        publicDocuments={publicDocuments} />

                    </div>
                    <div id="role" className="col s12 tab-style">
                      <h6>All Accessible Role Documents</h6>
                      <RoleDocumentList roleDocuments={roleDocuments} />

                    </div>
                    <div id="private" className="col s12 tab-style">
                      {this.state.isPrivate ?

                        <h6>All Private Documents</h6> : ''}
                      <PrivateDocumentList privateDocuments={privateDocuments}/>

                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

}

DashboardPage.propTypes = {
  publicDocuments: PropTypes.array.isRequired,
  privateDocuments: PropTypes.array.isRequired,
  roleDocuments: PropTypes.array.isRequired,
  loadUserDocument: PropTypes.func.isRequired,
  loadAllDocument: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
const mapStateToProps = (state) => {
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
    auth: state.auth.user.data,
    isAuthenticated: state.auth.isAuthenticated,
    roleDocuments,
    privateDocuments
  };
};


export default connect(mapStateToProps, { loadUserDocument,
  loadAllDocument })(DashboardPage);
