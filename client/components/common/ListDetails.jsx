import React, { PropTypes } from 'react';
import ListDetailBody from './ListDetailBody.jsx';
import ListDetailHeader from './ListDetailHeader.jsx';

const ListDetails = ({
  fullname, username, email, createdAt, showHeader, onEditClick, onChangeClick
}) => {
  return (
    <div>
      <ul id = "profile-page-about-details"
      className = "collection z-depth-1" >
      {showHeader ?
        <ListDetailHeader onEditClick={onEditClick}
          onChangeClick={onChangeClick}/>
           : ''
      }
      <ListDetailBody title="Name" value={fullname} />
      <ListDetailBody title="Username" value={username} />
      <ListDetailBody title="Email Address" value={email} />
      <ListDetailBody title="Created" value={createdAt} />
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
