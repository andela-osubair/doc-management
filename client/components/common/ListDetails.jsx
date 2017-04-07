import React, { PropTypes } from 'react';

const ListDetails = ({
  fullname, username, email, createdAt, showHeader, onEditClick, onChangeClick
}) => {
  return (
    <div>
      <ul id = "profile-page-about-details"
      className = "collection z-depth-1" >
      {showHeader ?
        <li className="collection-header pink darken-3 white-text">
          <div className="row">
            <div className="col s5 ">
              <p>
                <input
                  type="submit"
                  value="Edit Profile"
                  onClick={onEditClick}
                  className="btn waves-effect pink darken-4 waves-light"
                  />
              </p>
              </div>
            <div className="col s7 right-align">
              <p>
              <input
                type="submit"
                value="Change Password"
                onClick={onChangeClick}
                className="btn waves-effect pink darken-4 waves-light"
                /></p>
            </div>
          </div>

                  </li>
           : ''
      }
      <li className="collection-item">
          <div className="row">
            <div className="col s5 grey-text darken-1">
            <i className="mdi-action-wallet-travel"></i> Name</div>
            <div className="col s7 grey-text text-darken-4 right-align">
            {fullname}</div>
          </div>
        </li>
        <li className="collection-item">
            <div className="row">
              <div className="col s5 grey-text darken-1">
              <i className="mdi-action-wallet-travel"></i> Username</div>
              <div className="col s7 grey-text text-darken-4 right-align">
              {username}</div>
            </div>
          </li>
      <li className="collection-item">
          <div className="row">
            <div className="col s5 grey-text darken-1">
            <i className="mdi-action-wallet-travel"></i> Email Address</div>
            <div className="col s7 grey-text text-darken-4 right-align">
            {email}</div>
          </div>
        </li>
        <li className="collection-item">
            <div className="row">
              <div className="col s5 grey-text darken-1">
              <i className="mdi-action-wallet-travel"></i> Date Created</div>
              <div className="col s7 grey-text text-darken-4 right-align">
              {createdAt}</div>
            </div>
          </li>
      </ul>
    </div>
  );
};

ListDetails.propTypes = {
  fullname: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  createdAt: PropTypes.string,
  showHeader: PropTypes.bool,
  onEditClick: PropTypes.func,
  onChangeClick: PropTypes.func
};

export default ListDetails;
