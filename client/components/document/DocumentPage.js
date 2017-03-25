import React, {PropTypes} from 'react';
import DocumentList from './DocumentList';
import DocumentForm from './DocumentForm';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as documentActions from '../../actions/documentActions';
class DocumentPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
  }

  render() {
    const {auth, documents} = this.props;
    return (
      <div>
        <div className="fixed-action-btn">
          <a
            href="#modal1"
            className="btn-floating btn-large waves-effect waves-light red">
            <i className="material-icons">add</i>
          </a>
        </div>
        <DocumentList documents={documents}/>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Document</h4>
            <DocumentForm auth={auth}/>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  documents: PropTypes.array.isRequired,
  docValue: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired
};

/**
 *
 *
 * @param {any} documents
 * @param {any} id
 * @returns {any} object
 */
function getDocumentById(documents, id) {
  const document = documents.filter(doc => doc.id == id);
  if (document)
    {
    return document[0];
  } //since filter returns an array, have to grab the first.
  return null;
}

/**
 *
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {any}
 */
function mapStateToProps(state) {
  let currentState = state.manageDocuments;
  const documentId = currentState.selectedDocument;
  let document = {
    id: '',
    title: '',
    docContent: '',
    viewAccess: ''
  };
  if (documentId > 0) {
    document = getDocumentById(currentState.documents, documentId);
  }
  return {
    documents: currentState.documents,
    currentDocument: currentState.selectedDocument,
    auth: state.auth,
    docValue: document
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