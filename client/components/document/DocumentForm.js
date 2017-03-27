import React, { PropTypes } from 'react';
import toastr from 'toastr';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import { addFlashMessage } from '../../actions/flashMessages';

class DocumentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      document: {},
      errors: {},
      select: Object.assign({}, props.docValue).viewAccess,
      docTitle: Object.assign({}, props.docValue).title,
      model: Object.assign({}, props.docValue).docContent,
    };
    this.onChange = this.onChange.bind(this);
    this.updateTitleState = this.updateTitleState.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
  }

  componentDidMount() {
    $('#mySelectBox').on('change', this.onChange);
    $('#title').parent().find('label').addClass('active');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.docValue.id !== nextProps.docValue.id) {
      // Necessary to populate form when existing documents loaded directly.
      this.setState({
        docTitle: Object.assign({}, nextProps.docValue).title,
        model: Object.assign({}, nextProps.docValue).docContent,
        select: Object.assign({}, nextProps.docValue).viewAccess,
      });
    }
  }

  onChange(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    document.userId = this.props.auth.user.data.id;
    document.role = String(this.props.auth.user.data.roleId);
    this.setState({
      document, select: event.target.value });
  }

  updateTitleState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    this.setState({ docTitle: event.target.value });
  }

  handleModelChange(model) {
    const document = this.state.document;
    document.docContent = model;
    this.setState({ document, model });
  }

  saveDocument(event) {
    event.preventDefault();
    this
      .props
      .actions
      .saveDocument(this.state.document)
      .then(() => this.redirect())
      .catch(() => {
        toastr.error(
          'Unable to save document');
      });
  }

  updateDocument(event) {
    event.preventDefault();
    this
      .props
      .actions
      .updateDocument(this.state.document)
      .then(() => this.redirect())
      .catch(() => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Unable to update document, Confirm Document title conflict' });
        toastr.error(
          'Unable to update document');
        $('#modal1').modal('close');
      });
  }

  redirect() {
    toastr.success('Document Successfully Saved');
    this.context.router.push('/document');
    $('#modal1').modal('close');
  }

  render() {
    // console.log('props', this.props.currentDocument);

    const isValue = this.props.currentDocument;
    const form = (
      <form>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="title"
              type="text"
              value={this.state.docTitle}
              name="title"
              className="validate"
              onChange={this.updateTitleState}/>
              <label htmlFor="title">Title</label>
          </div>
          <div className="input-field col s12">
            <FroalaEditor
              tag="textarea"
              model={this.state.model}
              onModelChange={this.handleModelChange}/>
          </div>
          <br/>
          <div className="input-field col s12">
            <select name="viewAccess" id="mySelectBox"
            value={this.state.select}
            className="browser-default">
            <option value="" disabled >Restrict Document Access</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
          </select>
          </div>
          <div className="input-field col s12">
              <input
                type="submit"
                value="Save"
                className="btn waves-effect waves-light pink darken-1"
                onClick={isValue ? this.updateDocument : this.saveDocument}/>
          </div>
        </div>
      </form>
    );
    return (
      <div>
        {form}
      </div>
    );
  }

}

// Pull in the React Router context so router is available on
// this.context.router.
DocumentForm.contextTypes = {
  router: PropTypes.object
};

DocumentForm.propTypes = {
  // saveDocument: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func,
  docValue: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  currentDocument: PropTypes.string,
  addFlashMessage: React.PropTypes.func.isRequired
};

/**
 *
 *
 * @param {any} documents
 * @param {any} id
 * @returns {any} object
 */
function getDocumentById(documents, id) {
  const document = documents.filter((doc) => {
    return String(doc.id) === id;
  });
  if (document) {
    return document[0];
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
  const currentState = state.manageDocuments;
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
    actions: bindActionCreators(documentActions, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm);
