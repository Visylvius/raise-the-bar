import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import ReactCrop from 'react-image-crop';
import '!style!css!sass!react-image-crop/dist/ReactCrop.css';

import { makeAthlete, changeAvatar, cropImage } from '../../actions/athlete-actions';
import { makeInput, createValidate } from '../utils/form-utils';


const CreateAthlete = ({fields: {
  displayName,
  name,
  liftingStyle,
  location,
  trainer,
  cardDescription,
  hasTrainer,
  preferedGyms,
  avatar,
  bio
}, handleSubmit, makeAthlete, changeAvatar, cropImage, crop}, { router }) => {
  const onSubmit = (attributes) => {
    localStorage.setItem('type', JSON.stringify({type: 'athlete'}));
    makeAthlete(attributes);
  };
  const onAvatarBlur = (event) => {
    changeAvatar('CreateAthlete', 'avatar', event.target.files);
  };
  const onAvatarComplete = (crop) => {
    cropImage('CreateAthlete', 'crop', crop);
  };
  let cropElement = null;
  if (avatar.value) {
    cropElement = <ReactCrop src={avatar.value} onComplete={onAvatarComplete} crop={Object.assign({aspect: 1.2}, crop)}/>;
  }

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)} id='athleteForm'>
      {makeInput(displayName, 'text', 'Display Name')}
      {makeInput(name, 'text', 'Name')}
      {makeInput(liftingStyle, 'text', 'Lifting Style')}
      {makeInput(location, 'text', 'Location')}
      {makeInput(cardDescription, 'text', 'Tell us a little bit about yourself')}
      {makeInput(trainer, 'select', 'Are You a Trainer?', [
        {label: 'Yes', value: true},
        {label: 'No', value: false}
      ])}
      {makeInput(hasTrainer, 'select', 'Do You Have a Trainer?', [
        {label: 'Yes', value: true},
        {label: 'No', value: false}
      ])}
      {makeInput(Object.assign({}, avatar, {onChange: onAvatarBlur, onBlur: onAvatarBlur}), 'file', 'Please upload your profile picture here.')}
        {cropElement}
      <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({makeAthlete, changeAvatar, cropImage}, dispatch);

const mapStateToProps = (state) => { crop: state.crop };

export default reduxForm({
  form: 'CreateAthlete',
  fields: ['displayName', 'name', 'liftingStyle', 'location', 'trainer', 'hasTrainer', 'cardDescription', 'avatar'],
  validate: createValidate({
    displayName: 'Please enter a display name',
    name: 'Please enter a name',
    liftingStyle: 'Please enter your prefered lifting style',
    location: 'Please enter your location',
    // trainer: 'Validate that you are a trainer',
    // hasTrainer: 'Please validate if you have a trainer'
  })
}, mapStateToProps, mapDispatchToProps)(CreateAthlete);
