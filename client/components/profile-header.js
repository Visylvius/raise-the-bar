import React from 'react';

import { Link } from 'react-router';

const ProfileHeader = (props) => {
  return (
    <div className='profile-container'>
      <div className='row profile-top'>
        <div className='col-md-4'>
          <img style={imageContainer} src={`/avatars/${props.userId}.jpg`} />
          <div className='athlete-name' style={nameStyles}></div>
          <div className='lifting-style' style={liftingStyles}></div>
          <Link to={`/${props.userType}/update/${props.userId}`}><button type='button' className='btn btn-primary btn-lg' style={editProfile}><i className="fa fa-pencil-square-o" style={editIcon} aria-hidden="true"></i>Edit Profile</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
//<div className='row profile-top' style={baseStyles.profileTop}>
//   <div className='col-md-4'>
//     <img style={baseStyles.imageContainer} src={`/avatars/${id}.jpg`} />
//     <div className='athlete-name' style={baseStyles.athleteName}>{name}</div>
//     <div className='lifting-style' style={baseStyles.liftingStyle}>{location}</div>
//   </div>
//   <Link to={`/athlete/update/${id}`}><button type="button" className="btn btn-primary btn-lg" style={baseStyles.editProfile}><i className="fa fa-pencil-square-o" style={baseStyles.editIcon} aria-hidden="true"></i>Edit Profile</button></Link>
//   <button type='button' className='btn btn-success btn-lg' style={baseStyles.sendMessage}><i className='fa fa-envelope' style={baseStyles.editIcon}></i>Send Message</button>
// </div>
