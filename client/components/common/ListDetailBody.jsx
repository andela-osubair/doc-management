import React, { PropTypes } from 'react';

const ListDetailBody = ({ title, value }) => {
  return (
    <li className="collection-item">
        <div className="row">
          <div className="col s5 grey-text darken-1">
          <i className="mdi-action-wallet-travel"></i> {title}</div>
          <div className="col s7 grey-text text-darken-4 right-align">
          {value}</div>
        </div>
      </li>
  );
};

ListDetailBody.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default ListDetailBody;
