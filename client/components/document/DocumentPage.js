/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentList from './DocumentList';
import * as documentActions from '../../actions/documentActions';
import Modal from '../common/Modal';

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);

    this.deleteClick = this.deleteClick.bind(this);
  }
  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
  }

  deleteClick() {
    this.props.actions.deleteCurrentDocument();
    $('#modal1').modal('open');
  }

  render() {
    const { myDocuments } = this.props;
    return (
      <div className="row">
        <div className="col s12">
          <div className="col s12 z-depth-5 card-panel">
            <h4>My Documents</h4>
        <div className="fixed-action-btn" onClick={this.deleteClick}>
          <a
            className="btn-floating btn-large waves-effect waves-light red">
            <i className="material-icons">add</i>
          </a>
        </div>
        <DocumentList myDocuments={myDocuments}/>
        <Modal />
      </div>
      </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  myDocuments: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

/**
 *
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {any}
 */
function mapStateToProps(state) {
  const currentState = state.manageDocuments;
  const myDocuments = currentState.documents.filter(
    doc => doc.userId === state.auth.user.data.id);
  const publicDocuments = currentState.documents.filter(
      doc => doc.viewAccess === 'public');
  return {
    myDocuments,
    publicDocuments,
    currentDocument: currentState.selectedDocument
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
