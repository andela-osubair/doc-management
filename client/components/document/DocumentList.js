import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.editDocument = this.editDocument.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentDidMount() {
    $('.editDoc').click(this.editDocument);
  }
  editDocument(e) {
    e.preventDefault();
    const documentId = e.target.id;
    this.props.actions.setCurrentDocument(documentId);
  }
  deleteDocument(e) {
    e.preventDefault();
    const documentId = e.target.id;
    this.props.actions.deleteDocument(documentId)
    .then(() => toastr.success('Document Successfully Deleted'));
  }
  render() {
    return (
      <div>

        {this
          .props
          .myDocuments
          .map(document => <div id="card-alert" className="card white"
          key={document.id}>
            <div className="card-content pink-text">
              <a className="pointer"
                href="#modal1" id={document.id}
                onClick={this.editDocument}>
              {document.title}
              </a>
            </div>
            <div className="fixed-action-btn horizontal click-to-toggle edit">
              <a className="btn-floating pink">
                <i className="material-icons">more_vert</i>
              </a>
              <ul>
                <li onClick={this.editDocument} className="editDoc">
                  <a title="edit" href="#modal1"
                  className="btn-floating pink">
                    <i id={document.id} className="material-icons">mode_edit</i>
                  </a>
                </li>
                <li onClick={this.deleteDocument}>
                  <a title="delete" className="btn-floating red darken-1">
                    <i id={document.id} className="material-icons">delete</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>)}
      </div>
    );
  }
}

DocumentList.propsTypes = {
  actions: React.PropTypes.object.isRequired
};

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

export default connect(null, mapDispatchToProps)(DocumentList);
