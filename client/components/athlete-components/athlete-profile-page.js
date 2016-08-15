import React from 'react';
import Radium from 'radium';
import ProfileHeader from '../profile-header';
import NavigationLinks from '../navigation-links';
import ProfileInformation from '../profile-information';

import { fetchAthlete } from '../../actions/athlete-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const styleObject = {
  upperContainer: {
    marginTop: '20px'
  }
}

const baseStyles = {
  upperContainer: {
    marginTop: '20px',
    backgroundColor: '#blue'
  },
  pageContainer: {
    height: '100vh',
    backgroundColor: '#E6E6E6'
  },
  profileTop: {
    height: '123px',
    backgroundColor: '#E6E5E4',
    borderRadius: '5px 5px 0px 0px'
  },
  profileBottom: {
    height: '400px',
    backgroundColor: 'FFF'
  },
  imageContainer: {
    marginTop: '15px',
    marginLeft: '18px',
    height: '150px',
    width: '200px',
    borderRadius: '5px'
  },
  athleteName: {
    marginLeft: '270px',
    marginTop: '-140px',
    fontSize: '22px',
    fontWeight: 'bold'
  },
  liftingStyle: {
    marginLeft: '270px',
    fontSize: '18px',
    color: '#C9C9C8'
  },
  navigationLinks: {
    marginTop: '-24px',
    marginLeft: '40px'
  },
  lineBreak: {
    marginTop: '60px'
  },
  icons: {
    marginLeft: '20px'
  },
  hrSpace: {
    width: '195px',
    marginRight: '90px'
  },
  mainBio: {
    paddingTop: '10px',
    marginRight: '400px',
    fontSize: '20px',
    width: '200px'
  },
  profileNavigation: {
    width: '335px'
  },
  bioText: {
    height: '250px',
    width: '500px',
    border: '1px solid blue',
    marginLeft: '150px',
    marginTop: '-20px'
  },
  mainBioData: {
    border: '1px solid black'
  },
  bioDataMain: {
    width: '500px',
    wordWrap: 'break-word'
  },
  bioAbout: {
    marginLeft: '48px'
  },
  mainBioHr: {
    marginRight: '330px',
    marginBottom: '-40px'
  },
  editIcon: {
    marginRight: '5px'
  },
  editProfile: {
    marginTop: '35px',
    marginLeft: '200px',
    width: '300px'
  },
  sendMessage: {
    marginTop: '35px',
    width: '300px',
    marginLeft: '25px'
  }
};

  const AthleteProfile = ({athlete}) => {
    if (athlete === null) {
      return null;
    }
    let about, experience, liftingStyles;
    if (athlete.athlete_bio === undefined) {
      about = experience = liftingStyles = '';
    } else {
      const { athlete_bio } = athlete;
      about = athlete_bio.about;
      experience = athlete_bio.experience;
      liftingStyles = athlete_bio.liftingStyles
    }

    const { name, location, id } = athlete;

 return (
  <div className='container-fluid'>
   <ProfileHeader
      userId={id}
      userType='athlete'
      name={name}
      location={location}
   />
    <NavigationLinks />
    <ProfileInformation
      about={about}
      experience={experience}
      liftingStyles={liftingStyles}
    />
   </div>
 );
};


//TODO
//refactor into reusable components for trainers and athletes
//pass the style to through props, and then render the props, on the element in the component
//can pass array if has multiple styles, you can create multiple style props
/*<Avatar style={baseStyles.hrSpace} backgroundStyle={baseStyle.things} />*/
//other component
//return (
  //<div style={backgroundStyle}>

// )

const mapStateToProps = (state) => {
  console.log(state);
  const athlete = state.profile.athlete;
  console.log(athlete);
  return { athlete };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchAthlete}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(AthleteProfile));
// export default Radium(AthleteProfile);

{/*<div className='row'>
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
  </div>*/}
