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
  
  return (
    <div>
      <ProfileHeader
        name={trainer.displayName}
        location={trainer.location}
        userType='trainer'
        id={trainer.id}
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
  const { trainer, error, loading } = state.trainer
  return { trainer, error, loading };
}


export default connect(mapStateToProps, mapDispatchToProps)(DisplayTrainer);
