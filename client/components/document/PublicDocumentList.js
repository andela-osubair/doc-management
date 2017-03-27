import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from '../common/Modal';
import * as documentActions from '../../actions/documentActions';

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }
  renderModal(e) {
    e.preventDefault();
    const documentId = e.target.id;
    this.props.actions.setCurrentDocument(documentId);
    $('#modal1').modal('open');
  }
  render() {
    return (
      <div>

        {this
          .props
          .publicDocuments
          .map(document => <div id="card-alert" className="card white"
          key={document.id}>
            <div className="card-content pink-text">
              <a className="pointer" id={document.id}
                onClick={this.renderModal}>
              {document.title}
              </a>
            </div>
            <div className="fixed-action-btn horizontal edit">
              <a className="btn-floating pink" onClick={this.renderModal}>
                <i id={document.id} className="material-icons">more_vert</i>
              </a>
            </div>
          </div>)}
          <Modal />
      </div>
    );
  }
}

DocumentList.propsTypes = {
  publicDocuments: React.PropTypes.isRequired,
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
