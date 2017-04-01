/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleResult: [],
      contentResult: [],
      value: ''
    };
    this.onChange = this.onChange.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }
  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
  }


  onChange(e) {
    e.preventDefault();
    const value = e.target.value;
    let searchTitleResult;
    let searchContentResult;
    if (value.trim() !== '') {
      value.toLowerCase();
      searchTitleResult = this.props.stateDocuments.filter((doc) => {
        const title = doc.title.toLowerCase();
        return title.includes(value);
      });
      searchContentResult = this.props.stateDocuments.filter((doc) => {
        const content = doc.docContent.toLowerCase();
        return content.includes(value);
      });
      this.setState({
        titleResult: searchTitleResult,
        contentResult: searchContentResult,
        value });
    }
  }
  renderModal(e) {
    e.preventDefault();
    const documentId = e.target.id;
    this.props.actions.setCurrentDocument(documentId);
    $('#modal2').modal('close');
    $('#modal1').modal('open');
  }

  render() {
    return (
      <div>
        <div id="modal2" className="modal">
        <div>
          <a href="#"
            className="btn-floating pink closeModal modal-close">
            <i className="material-icons">close</i></a>
        </div>
          <div className="modal-content">
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input
                      id="search"
                      type="text"
                      className="validate"
                      onChange={this.onChange}
                       />
                    <label htmlFor="search" className="active">search</label>
                  </div>
                </div>
              </form>
              <div id="result" className="col s12">
                <div className="row">
                  <div className="col s6">
                    {this.state.value ?
                    <h6 id="searchResult">
                      Result for "{this.state.value}" in Document Title</h6>
                     : ''}
                    {this.state.titleResult.map(document =>
                      <div id="card-alert" className="card white"
                      key={document.id}>
                        <div className="card-content pink-text">
                          <a className="pointer" id={document.id}
                            onClick={this.renderModal}>
                          Title: {document.title}
                          </a>
                        </div>
                      </div>)}
                  </div>
                  <div className="col s6">
                    {this.state.value ?
                    <h6>
                      Result for "{this.state.value}" in Document Contents</h6>
                     : ''}
                    {this.state.contentResult.map(document =>
                      <div id="card-alert" className="card white"
                      key={document.id}>
                        <div className="card-content pink-text">
                          <a className="pointer" id={document.id}
                            onClick={this.renderModal}>
                          Title: {document.title}
                          </a>
                        </div>
                      </div>)}
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

SearchModal.propsTypes = {
  stateDocuments: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};

/**
 * [mapStateToProps description]
 * @param  {object} state [description]
 * @return {object}  state     [description]
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
    stateDocuments: state.manageDocuments.documents
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
