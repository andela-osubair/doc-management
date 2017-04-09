import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';

class DocumentDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      select: Object.assign({}, props.docValue).viewAccess,
      docTitle: Object.assign({}, props.docValue).title,
      model: Object.assign({}, props.docValue).docContent,
      author: Object.assign({}, props.docValue.User).name
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s8 offset-s3">
            <div id="card-alert" className="card white">
              <div className="card-content pink-text">
                <a>
                Author: {this.state.author}
                </a>
              </div>
            </div>

            <div id="card-alert" className="card white">
              <div className="card-content pink-text">
                <a>
                Title: {this.state.docTitle}
                </a>
              </div>
            </div>

            <div id="card-alert" className="card white">
              <div className="card-content pink-text">
                <a>
                Content: {renderHTML(this.state.model)}
                </a>
              </div>
            </div>

            <div id="card-alert" className="card white">
              <div className="card-content pink-text">
                <a>
                Access: {this.state.select}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

}
DocumentDetails.propTypes = {
  docValue: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  currentDocument: PropTypes.string,
};

/**
 *
 *
 * @param {any} documents
 * @param {any} id
 * @returns {any} object
 */
const getDocumentById = (documents, id) => {
  const document = documents.filter((doc) => {
    return String(doc.id) === id;
  });
  if (document) {
    return document[0];
  } // since filter returns an array, have to grab the first.
  return null;
};

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
const mapStateToProps = (state) => {
  const currentState = state.manageDocuments;
  const documentId = state.currentlySelected.selectedDocument;
  let document = {
    id: '',
    title: '',
    docContent: '',
    viewAccess: '',
    author: ''
  };

  if (documentId > 0) {
    document = getDocumentById(currentState.documents, documentId);
  }

  console.log(document);
  return {
    documents: currentState.documents,
    currentDocument: documentId,
    docValue: document,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(DocumentDetails);
