import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTrainers } from '../../actions/trainer-actions';
import UserCard from '../user-card';

const DisplayTrainers = (props) => {
  if (props.trainers === null) {
    return null;
  }

const TrainerCard = props.trainers.map((trainer) => {
  return (
    <UserCard
      key={trainer.id}
      id={trainer.id}
      userType='trainer'
      displayName={trainer.displayName}
    />
  );
});
  // const {displayName} = props.trainers;
  // console.log(displayName);
  console.log(props.trainers);
  return (
    <div>
      {TrainerCard}
    </div>

  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchTrainers}, dispatch)
};

const mapStateToProps = (state) => {
  const { trainers, error, loading } = state.trainers
  return { trainers, error, loading };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTrainers);
