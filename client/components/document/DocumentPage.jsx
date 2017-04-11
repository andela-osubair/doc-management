/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentList from './DocumentList.jsx';
import * as documentActions from '../../actions/documentActions';
import Modal from '../common/Modal.jsx';

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);

    this.deleteClick = this.deleteClick.bind(this);
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.actions.loadUserDocument();
    }
  }
  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });
  }

  deleteClick() {
    this.props.actions.deleteCurrentDocument();
    $('#modal1').modal('open');
  }

  render() {
    const { myDocuments } = this.props;
    const count = myDocuments.length;
    return (
      <div className="row">
          <div id="documentPage" className="col s12 z-depth-5 card-panel">
            <h4>My Documents</h4>
        <div id="addBtnDiv"
          className="fixed-action-btn" onClick={this.deleteClick}>
          <a
  className="btn-floating btn-large waves-effect waves-light red tooltipped"
  data-position="left" data-delay="50"
  data-tooltip="create new document"
  >
            <i className="material-icons">add</i>
          </a>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col s5">
                <div id="card-alert" className="card deep-purple lighten-5">
                          <div className="card-content deep-purple-text">
                            <p>INFO : You have {count} Documents</p>
                          </div>
                        </div>
              </div>
              <div className="col s7">
                <DocumentList myDocuments={myDocuments}/>
              </div>
            </div>
          </div>

        </div>
        <Modal />
      </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  myDocuments: PropTypes.array.isRequired,
  publicDocuments: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
function mapStateToProps(state) {
  const currentState = state.manageDocuments;
  const isAuthenticated = state.auth.isAuthenticated;
  let myDocuments = [];
  if (state.auth.isAuthenticated) {
    myDocuments = currentState.documents.filter(
     doc => doc.userId === state.auth.user.data.id);
  }

  const publicDocuments = currentState.documents.filter(
      doc => doc.viewAccess === 'public');
  return {
    myDocuments,
    publicDocuments,
    currentDocument: state.currentlySelected.selectedDocument,
    isAuthenticated
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
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
