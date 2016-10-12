import React from 'react';
import Radium from 'radium';
import ProfileHeader from '../profile-header';
import NavigationLinks from '../navigation-links';
import ProfileInformation from '../profile-information';

import { fetchAthlete } from '../../actions/athlete-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';

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
  const { name, location, id, email } = athlete;
  const { type } = JSON.parse(localStorage.getItem('type'));
  const profileImageStyles = baseStyles.profileImage;
  profileImageStyles.backgroundImage = `url(/avatars/${type}/${id}.jpg)`

  function handleActive(tab) {
    alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
  }

 return (
  <div className='container-fluid'>
    <div className='image-container' style={baseStyles.profileImageContainer}>
      <div className='image' style={baseStyles.imageContent}>
        <img src={`/avatars/${type}/${id}.jpg`} className='user-avatar' style={baseStyles.profileImage}/>
        <p style={baseStyles.centerText}>{athlete.liftingStyle}</p>
      </div>

      {/* <div className='user-avatar' style={baseStyles.profileImage}></div> */}
    </div>
    <Tabs>
      <Tab label="Item One" >
        <div>
          <h2 style={baseStyles.headline}>Tab One</h2>
          <p>
            This is an example tab.
          </p>
          <p>
            You can put any sort of HTML or react component in here. It even keeps the component state!
          </p>
        </div>
      </Tab>
      <Tab label="Item Two" >
        <div>
          <h2 style={baseStyles.headline}>Tab Two</h2>
          <p>
            This is another example tab.
          </p>
        </div>
      </Tab>
      <Tab
      label="onActive"
      data-route="/home"
      onActive={handleActive}
      >
        <div>
          <h2 style={baseStyles.headline}>Tab Three</h2>
          <p>
            This is a third example tab.
          </p>
        </div>
      </Tab>
    </Tabs>

   {/* <ProfileHeader
      className='profile-header'
      userId={id}
      userType='athlete'
      name={name}
      email={email}
      location={location}
   /> */}
    <NavigationLinks />
    <ProfileInformation
      className='profile-information'
      about={about}
      experience={experience}
      liftingStyles={liftingStyles}
    />
   </div>
 );
};

const baseStyles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  centerText: {
    textAlign: 'center'
  },
  profileImageContainer: {
    display: 'table',
    width: '100%'
  },
  // profileImage: {
  //   height: '250px',
  //   width: '250px',
  //   border: '1px solid red',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: '65%',
  //   borderRadius: '5px',
  //   marginRight: 'auto',
  //   marginLeft: 'auto'
  // },
  profileImage: {
    border: '1px solid red',
    borderRadius: '5px',
    height: '150px'
  },
  imageContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
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
