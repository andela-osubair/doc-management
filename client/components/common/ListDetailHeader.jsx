import React, { PropTypes } from 'react';
import SubmitButton from './SubmitButton.jsx';

const ListDetailHeader = ({ onEditClick, onChangeClick }) => {
  return (
    <div>
      <li className="collection-header pink darken-3 white-text">
        <div className="row">
          <div className="col s5 ">
            <p>
              <SubmitButton type="submit" value="Edit Profile"
                onClick={onEditClick}/>
            </p>
            </div>
          <div className="col s7 right-align">
            <p>
              <SubmitButton type="submit"
                value="Change Password" onClick={onChangeClick}/>
            </p>
          </div>
        </div>

                </li>
    </div>
  );
};

ListDetailHeader.propTypes = {
  onEditClick: PropTypes.func.isRequired,
  onChangeClick: PropTypes.func.isRequired,
};

export default ListDetailHeader;
