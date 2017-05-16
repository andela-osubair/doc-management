import React, { PropTypes } from 'react';

const CardOptionButton = ({ id, onClick }) => {
  return (
    <div>
      <a className="btn-floating btn-flat pink"
        onClick={onClick}>
        <i id={id} className="material-icons">view_list</i>
      </a>
    </div>
  );
};

CardOptionButton.propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default CardOptionButton;
