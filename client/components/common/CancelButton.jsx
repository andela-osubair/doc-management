import React, { PropTypes } from 'react';

const CancelButton = ({ onClick }) => {
  return (
    <a
        className="btn waves-effect waves-light blue-grey lighten-3"
        onClick={onClick}>Cancel</a>
  );
};

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CancelButton;
