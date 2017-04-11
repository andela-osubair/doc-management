import React, { PropTypes } from 'react';

const DashboardDocumentList = ({ onClick, documents }) => {
  return (
    <div>

      {documents
        .map(document => <div id="card-alert" className="card white"
        key={document.id}>
          <div className="card-content pink-text">
            <a className="pointer" id={document.id}
              onClick={onClick}>
            Title: {document.title}
            <span className="badge list-badge">
              Author: {document.User.name}</span>

            </a>
          </div>
          <div className="fixed-action-btn horizontal edit">
            <a className="btn-floating btn-flat pink"
              onClick={onClick}>
              <i id={document.id} className="material-icons">view_list</i>
            </a>
          </div>
        </div>)}
    </div>
  );
};

DashboardDocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DashboardDocumentList;
