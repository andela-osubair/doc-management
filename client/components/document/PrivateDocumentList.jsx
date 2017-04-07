import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import DashboardDocumentList from '../common/DashboardDocumentList.jsx';

class PrivateDocumentList extends React.Component {
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
        <DashboardDocumentList
          documents={this.props.privateDocuments}
          onClick={this.renderModal}
          />
      </div>
    );
  }
}

PrivateDocumentList.propTypes = {
  privateDocuments: React.PropTypes.array.isRequired,
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

export default connect(null, mapDispatchToProps)(PrivateDocumentList);
