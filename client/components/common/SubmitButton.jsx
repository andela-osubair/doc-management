import React, { PropTypes } from 'react';

const SubmitButton = ({ type, value, onClick }) => {
  return (
    <input
      type={type}
      value={value}
      className="btn waves-effect waves-light pink darken-1"
      onClick={onClick}/>
  );
};

SubmitButton.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default SubmitButton;
