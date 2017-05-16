/* eslint class-methods-use-this: "off"*/
import React, { PropTypes } from 'react';
import DocumentForm from '../document/DocumentForm.jsx';
import DocumentDetails from '../document/DocumentDetails.jsx';

class Modal extends React.Component {
  componentDidMount() {
    $('select').material_select();
  }

  render() {
    const { documentDetails } = this.props;
    return (
      <div>
        <div id="modal1" className="modal">
          <div>
            <a href="#"
              className="btn-floating btn-flat pink closeModal modal-close">
              <i className="material-icons">close</i></a>
          </div>
          <div className="modal-content">
            <h4>Document</h4>
            {documentDetails ? <DocumentDetails /> : <DocumentForm />}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  documentDetails: PropTypes.bool.isRequired
};

export default Modal;
