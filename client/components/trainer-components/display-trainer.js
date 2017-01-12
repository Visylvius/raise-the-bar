import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import {Tabs, Tab} from 'material-ui/Tabs';
import SendMessage from '../inbox-components/send-message';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import SendLetterIcon from 'material-ui/svg-icons/communication/contact-mail';
import UserProfileIcon from 'material-ui/svg-icons/action/account-box';
import EditProfileIcon from 'material-ui/svg-icons/editor/mode-edit';

import { fetchTrainer, displayTrainerGyms } from '../../actions/trainer-actions';
import { setGymToActive, isUserAtTheGym, getGymPhotoUrl } from '../athlete-components/athlete-profile-page';
import store from '../../reducers/index';

import DisplayProfileGyms from '../gym-components/display-profile-gyms';
import ProfileHeader from '../profile-header';
import NavigationLinks from '../navigation-links';
import ProfileInformation from '../profile-information';

const DisplayTrainer = ({trainer, gyms, routeParams}) => {
  if (trainer === null) {
    return null;
  }

  let about, experience, liftingStyles;

  if (trainer.trainer_bio === undefined) {
    about = experience = liftingStyles = '';
  } else {
    const { trainer_bio } = trainer;
    about = trainer_bio.about;
    experience = trainer_bio.experience;
    liftingStyles = trainer_bio.liftingStyles;
  }

  const { id, email, name, location, displayName } = trainer;
  //if the user is an athlete, then it won't render the profile picture properly.
  //change this so it recives the trainer and then renders it properly.
  const { type } = JSON.parse(localStorage.getItem('type'));
  console.log(trainer);

  const fetchUserGyms = () => {
    store.dispatch(displayTrainerGyms(routeParams.id));
  };


  const editProfileButton = () => {
    const userProfile = JSON.parse(localStorage.getItem('profile'));
    const userType = JSON.parse(localStorage.getItem('type'));
    const { type } = userType;
    const { email } = userProfile;

    if (trainer.email === email && type === 'trainer') {
      return (
        <div className='edit-profile-container' style={baseStyles.centerEditButton}>
        <Link to={`/${type}/update/${routeParams.id}`}>
          <RaisedButton
          className={'trainer-profile-edit-button'}
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

  return (
    <div className='container-fluid'>
      <div className='image-container' style={baseStyles.profileImageContainer}>
        <div className='image' style={baseStyles.imageContent}>
          <img src={`http://res.cloudinary.com/raise-the-bar/image/upload/${trainer.imgId}.jpg`} className='user-avatar' style={baseStyles.profileImage}/>
          <p className='trainer-display-name' style={baseStyles.trainerDisplayName}>{trainer.displayName}</p>
          <p className='trainer-lifting-style' style={baseStyles.trainerLiftingStyle}>{trainer.location}</p>
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
          <DisplayProfileGyms
            isUserAtTheGym={isUserAtTheGym}
            setGymToActive={setGymToActive}
            getGymPhotoUrl={getGymPhotoUrl}
            gyms={gyms}
            userData={trainer}
            userType='trainer'
          />
        </Tab>
        <Tab
        icon={<SendLetterIcon />}
        label="Send Message"
        >
          <SendMessage
            userId={routeParams.id}
            recipientType='trainer'
            profileLayout={true}
            inboxLayout={false}
          />
        </Tab>
      </Tabs>
     </div>
  );
};

const baseStyles = {
  centerEditButton: {
    textAlign: 'center',
    marginTop: '10px'
  },
  trainerDisplayName: {
    textAlign: 'center',
    fontSize: '20px'
  },
  trainerLiftingStyle: {
    textAlign: 'center',
    fontSize: '14px'
  },
  profileImageContainer: {
    display: 'table',
    width: '100%'
  },
  imageContent: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  profileImage: {
    borderRadius: '5px',
    height: '150px'
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchTrainer}, dispatch);

const mapStateToProps = (state) => {
  const trainer = state.trainer.trainer;
  const gyms = state.trainerGym;
  return { trainer, gyms };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTrainer);
