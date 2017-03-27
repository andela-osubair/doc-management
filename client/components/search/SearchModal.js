/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      contentResult: [],
      value: ''
    };
    this.onChange = this.onChange.bind(this);
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
        searchResult: searchTitleResult,
        contentResult: searchContentResult });
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <div id="modal2" className="modal">
        <div>
          <a href="#" className="btn-floating pink closeModal modal-close"><i className="material-icons">close</i></a>
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
                    <h6>Title</h6>
                    <div className="divider"></div>
                    {this.state.searchResult.map(document =>
                      <div id="card-alert" className="card white"
                      key={document.id}>
                        <div className="card-content pink-text">
                        <a href="#">{document.title}</a>
                        </div>
                      </div>)}
                  </div>
                  <div className="col s6">
                    <h6>Document Content</h6>
                    <div className="divider"></div>
                    {this.state.contentResult.map(document =>
                      <div id="card-alert" className="card white"
                      key={document.id}>
                        <div className="card-content pink-text">
                          {document.title}
                        </div>
                        <div className="fixed-action-btn horizontal edit">
                          <a className="btn-floating pink" onClick={this.renderModal}>
                            <i id={document.id} className="material-icons">more_vert</i>
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
  auth: PropTypes.object.isRequired
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

export default connect(mapStateToProps)(SearchModal);
