import React, { PropTypes } from 'react';

const SubmitButton = ({ id, type, value, onClick }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      className="btn waves-effect waves-light pink darken-1"
      onClick={onClick}/>
  );
};

SubmitButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default SubmitButton;
