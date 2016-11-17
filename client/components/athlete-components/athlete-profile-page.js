import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ProfileHeader from '../profile-header';
import NavigationLinks from '../navigation-links';
import ProfileInformation from '../profile-information';
import SendMessage from '../inbox-components/send-message';
import SendLetterIcon from 'material-ui/svg-icons/communication/contact-mail';
import UserProfileIcon from 'material-ui/svg-icons/action/account-box';
import EditProfileIcon from 'material-ui/svg-icons/editor/mode-edit';

import { fetchAthlete, displayAthleteGyms } from '../../actions/athlete-actions';
import { toggleGymToActive } from '../../actions/gyms-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import store from '../../reducers/index'

  const AthleteProfile = ({athlete, gyms, routeParams}, props) => {
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


  const { name, location, id, email, displayName } = athlete;
  const { type } = JSON.parse(localStorage.getItem('type'));
  const profileImageStyles = baseStyles.profileImage;
  profileImageStyles.backgroundImage = `url(/avatars/${type}/${id}.jpg)`

  function handleActive(tab) {
    alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
  }

  const editProfileButton = () => {
    const userProfile = JSON.parse(localStorage.getItem('profile'));
    const userType = JSON.parse(localStorage.getItem('type'));
    const { type } = userType;
    const { email } = userProfile;

    if (athlete.email === email && type === 'athlete') {
      return (
        <div className='edit-profile-container' style={baseStyles.centerEditButton}>
        <Link to={`/${type}/update/${routeParams.id}`}>
          <RaisedButton
          className={'athlete-profile-edit-button'}
          label="Edit Profile"
          primary={true}
          style={baseStyles.marginHelper}
          icon={<EditProfileIcon />}
          />
        </Link>
        </div>
      );
    } else {
      return '';
    }
  };

  const fetchUserGyms = () => {
    store.dispatch(displayAthleteGyms(JSON.parse(localStorage.getItem('profile'))));
  };

  const setGymToActive = (placeId, profile) => {
    const { email } = profile;
    store.dispatch(toggleGymToActive(placeId, email))
  }

  const isUserAtTheGym = (currentGym) => {
    console.log('currentGym', currentGym);
    return ((Date.now() / 1000) - currentGym.startedWorkingOut) < (1 * 3600) &&
    gyms.userGyms.filter(gym => gym.placeId !== currentGym.placeId && gym.startedWorkingOut > currentGym.startedWorkingOut).length === 0
  }

 return (
  <div className='container-fluid'>

    <div className='image-container' style={baseStyles.profileImageContainer}>
      <div className='image' style={baseStyles.imageContent}>
        <img src={`/avatars/athlete/${athlete.imgId}.jpg`} className='user-avatar' style={baseStyles.profileImage}/>
        <p className='athlete-display-name' style={baseStyles.athleteDisplayName}>{athlete.displayName}</p>
        <p className='athlete-lifting-style' style={baseStyles.athleteLiftingStyle}>{athlete.liftingStyle}</p>
      </div>
    </div>
    <Tabs>
      <Tab
        label="Profile"
        icon={<UserProfileIcon />}
      >
        <Card>
          <CardHeader
            title="About"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            {console.log('routeParams', routeParams)}
            <p className='about-text'>{about}</p>
          </CardText>
        </Card>
        <Card>
          <CardHeader
            title="Lifting Styles"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p className='lifting-styles-text'>{liftingStyles}</p>
          </CardText>
        </Card>
        <Card>
          <CardHeader
            title="Experience"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p className='experience-text'>{experience}</p>
          </CardText>
        </Card>
        {editProfileButton()}
      </Tab>
      <Tab label="Gyms" onActive={fetchUserGyms}>
        {/*You don't have a gym yet, why not select one?*/}
        {console.log('gyms', gyms)}
        { gyms.loaded ?
          <div className='gym-card-container'>
            {gyms.userGyms.map((result, index) => {
              return (
                <Card>
                  <CardHeader
                    title="Daily Hours"
                    subtitle={result.phoneNumber}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardText expandable={true}>
                    {result.dailyHours.weekday_text.map((hours) => {
                      return (
                        <div className='daily-hours-container'>{hours}</div>
                      );
                    })}
                  </CardText>
                  <CardActions>
                    <RaisedButton
                      label='Currently at the gym'
                      key={result.id}
                      primary={true}
                      className={`button-${index}`}
                      onTouchTap={() => {
                        setGymToActive(result.placeId, JSON.parse(localStorage.getItem('profile')))
                        store.dispatch({type: 'TOGGLE_ACTIVE_LOCAL', placeId: result.placeId })
                      }}
                    />
                  </CardActions>
                  { console.log('result.startedWorkingOut', result.startedWorkingOut) }
                  { ((Date.now() / 1000) - result.startedWorkingOut) < (1*3600) ? console.log('user is at the gym', true) : console.log('user is not at the gym', false) }
                  { isUserAtTheGym(result) ?
                    <div
                      style={
                        {
                          right: '10px',
                          top: '90px',
                          position: 'absolute',
                          color: '#FF9800'
                        }}
                    >
                      is at the gym
                    </div>
                    : null }
                </Card>
              );
            })}
          </div>
          : <div>Gyms are loading</div>}
      </Tab>
      <Tab
      icon={<SendLetterIcon />}
      label="Send Message"
      >
        <SendMessage
          recipientId={routeParams.id}
          recipientType='athlete'
          profileLayout={true}
          inboxLayout={false}
        />
      </Tab>
    </Tabs>
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
  athleteDisplayName: {
    textAlign: 'center',
    fontSize: '20px'
  },
  athleteLiftingStyle: {
    textAlign: 'center',
    fontSize: '14px'
  },
  profileImageContainer: {
    display: 'table',
    width: '100%'
  },
  centerEditButton: {
    textAlign: 'center',
    marginTop: '10px'
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
  const athlete = state.profile.athlete;
  const gyms = state.athleteGym;
  return { athlete, gyms };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchAthlete}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(AthleteProfile));
// export default Radium(AthleteProfile);
