import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { makeAthlete } from '../../actions/athlete-actions';
import { makeInput, createValidate } from '../utils/form-utils';

const CreateAthlete = ({fields: {
  displayName,
  name,
  liftingStyle,
  location,
  trainer,
  hasTrainer,
  preferedGyms,
  avatar
}, handleSubmit, makeAthlete }, { router }) => {
  const onSubmit = (attributes) => {
    makeAthlete(attributes);
  };
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)} id='athleteForm'>
      {makeInput(displayName, 'text', 'Display Name')}
      {makeInput(name, 'text', 'Name')}
      {makeInput(liftingStyle, 'text', 'Lifting Style')}
      {makeInput(location, 'text', 'Location')}
      {makeInput(trainer, 'select', 'Are You a Trainer?', [
        {label: 'Yes', value: true},
        {label: 'No', value: false}
      ])}
      {makeInput(hasTrainer, 'select', 'Do You Have a Trainer?', [
        {label: 'Yes', value: true},
        {label: 'No', value: false}
      ])}
      {makeInput(avatar, 'file', 'Please upload your profile picture here.')}
      <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({makeAthlete}, dispatch);
}

export default reduxForm({
  form: 'CreateAthlete',
  fields: ['displayName', 'name', 'liftingStyle', 'location', 'trainer', 'hasTrainer', 'avatar'],
  validate: createValidate({
    displayName: 'Please enter a display name',
    name: 'Please enter a name',
    liftingStyle: 'Please enter your prefered lifting style',
    location: 'Please enter your location'//,
    // trainer: 'Validate that you are a trainer',
    // hasTrainer: 'Please validate if you have a trainer'
  })
}, null, mapDispatchToProps)(CreateAthlete);
