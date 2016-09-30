import React from 'react';

import { fetchTrainer } from '../../actions/trainer-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProfileHeader from '../profile-header';
import NavigationLinks from '../navigation-links';
import ProfileInformation from '../profile-information';

const DisplayTrainer = ({trainer}) => {
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
  console.log(trainer);
  return (
    <div>
      <ProfileHeader
        name={displayName}
        location={location}
        userType='trainer'
        userId={id}
        userType='trainer'
        email={email}
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


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchTrainer}, dispatch);
}

const mapStateToProps = (state) => {
  const trainer = state.trainer.trainer;
  return { trainer };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayTrainer);
