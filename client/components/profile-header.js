import React from 'react';

import { Link } from 'react-router';

const ProfileHeader = (props) => {
  const imageStyles = stylesObject.imageContainer;
  imageStyles.backgroundImage = `url(/avatars/${props.userId}.jpg)`;
  return (
    <div className='profile-container'>
      <div className='row profile-top'>
        <div className='col-md-12'>
          <div style={imageStyles}></div>
          <div className='athlete-name' style={stylesObject.athleteName}></div>
          <div className='lifting-style' style={stylesObject.liftingStyles}></div>
          <Link to={`/${props.userType}/update/${props.userId}`}><button type='button' className='btn btn-primary btn-lg' style={stylesObject.editProfile}><i className="fa fa-pencil-square-o" style={stylesObject.editIcon} aria-hidden="true"></i>Edit Profile</button></Link>
          <button type='button' className='btn btn-success btn-lg' style={stylesObject.sendMessage}><i className='fa fa-envelope' style={stylesObject.editIcon}></i>Send Message</button>
        </div>
      </div>
    </div>
  );
};


var stylesObject = {
  imageContainer: {
    height: '200px',
    width: '250px',
    borderRadius: '5px',
    backgroundSize: '100% auto',
    float: 'left'
  },
  liftingStyle: {
    fontSize: '18px',
    color: '#C9C9C8'
  },
  athleteName: {
    fontSize: '22px',
    fontWeight: 'bold'
  },
  sendMessage: {
    width: '300px',
    float: 'right',
    margin: '20px 20px 20px 20px'
  },
  editIcon: {
  },
  editProfile: {
    width: '300px',
    float: 'right',
    margin: '20px 20px 20px 20px'
  },
};


{/*<div style={...stylesObject.imageContainer, backgroundImage: `url(/avatars/${props.userId}.jpg)`} src={`/avatars/${props.userId}.jpg`}></div>*/}
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
