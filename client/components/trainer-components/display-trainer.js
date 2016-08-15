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

  const { id } = trainer;
  console.log(trainer);
  return (
    <div>
      <ProfileHeader
        name={trainer.displayName}
        location={trainer.location}
        userType='trainer'
        userId={id}
      />
      <NavigationLinks />
      <ProfileInformation
      />
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchTrainer}, dispatch);
}

const mapStateToProps = (state) => {
  console.log(state);
  const trainer = state.trainer.trainer;
  console.log(trainer);
  return { trainer };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayTrainer);
