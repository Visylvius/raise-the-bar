import React from 'react';

const NavigationLinks = (props) => {
  return (
    <div className='row'>
      <div className='col-md-12 profile-navigation' style={baseStyles.profileNavigation}>
        <hr className='line-break hr-space' style={[baseStyles.hrSpace, baseStyles.lineBreak]} />
        <div className='icons' style={baseStyles.icons}><i className='fa fa-user'></i></div>
        <div className='navigation-links' style={baseStyles.navigationLinks}>Profile</div>
        <hr className='hr-space' style={baseStyles.hrSpace} />
        <div className='icons' style={baseStyles.icons}><i className='fa fa-envelope'></i></div>
        <div className='navigation-links' style={baseStyles.navigationLinks}>Message</div>
        <hr className='hr-space' style={baseStyles.hrSpace}/>
        <div className='icons' style={baseStyles.icons}><i className='fa fa-building'></i></div>
        <div className='navigation-links' style={baseStyles.navigationLinks}>Gyms</div>
        <hr className='hr-space' style={baseStyles.hrSpace}/>
        <div className='icons' style={baseStyles.icons}><i className='fa fa-calendar'></i></div>
        <div className='navigation-links' style={baseStyles.navigationLinks}>Schedule</div>
      </div>
    </div>
  );
};

export default NavigationLinks;

var baseStyles = {
  navigationLinks: {
    marginTop: '-24px',
    marginLeft: '40px'
  },
  profileNavigation: {
    width: '335px'
  },
  hrSpace: {
    width: '195px',
    marginRight: '90px'
  },
  lineBreak: {
    marginTop: '60px'
  },
  icons: {
    marginLeft: '20px'
  }
};
