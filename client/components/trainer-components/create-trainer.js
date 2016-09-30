import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import ReactCrop from 'react-image-crop';
import '!style!css!sass!react-image-crop/dist/ReactCrop.css';

import { makeTrainer } from '../../actions/trainer-actions';
import { changeAvatar, cropImage } from '../../actions/athlete-actions';
import { makeInput, createValidate } from '../utils/form-utils';

const CreateTrainer = ({fields: {
  displayName,
  name,
  location,
  driveForClient,
  offerFitnessAssessment,
  offerNutritionPlan,
  price,
  takingNewClients,
  phoneNumber,
  avatar
}, handleSubmit, makeTrainer, changeAvatar, cropImage, crop}, { router }) => {
  const onSubmit = (attributes) => {
    makeTrainer(attributes);
  };
  const onAvatarBlur = (event) => {
    changeAvatar('CreateTrainer', 'avatar', event.target.files);
  };
  const onAvatarComplete = (crop) => {
    cropImage('CreateTrainer', 'crop', crop);
  };
  let cropElement = null;
  if (avatar.value) {
    cropElement = <ReactCrop src={avatar.value} onComplete={onAvatarComplete} crop={Object.assign({aspect: 1.2}, crop)}/>;
  }
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      {makeInput(displayName, 'text', 'Display Name')}
      {makeInput(name, 'text', 'Name')}
      {makeInput(location, 'text', 'Location')}
      {makeInput(driveForClient, 'select', 'Drive For Client?', [
        {value: true, label: 'Yes'},
        {value: false, label: 'No'}
      ])}
      {makeInput(offerFitnessAssessment, 'select', 'Offer Fitness Asssement', [
        {value: true, label: 'Yes'},
        {value: false, label: 'No'}
      ])}
      {makeInput(offerNutritionPlan, 'select', 'Offer Nutrition Plan?', [
        {value: true, label: 'Yes'},
        {value: false, label: 'No'}
      ])}
      {makeInput(price, 'number', 'Price', null, {min: 0, step: 0.05})}
      {makeInput(takingNewClients, 'select', 'Taking New Clients?', [
        {value: true, label: 'Yes'},
        {value: false, label: 'No'}
      ])}
      {makeInput(phoneNumber, 'text', 'Phone Number')}
      {makeInput(Object.assign({}, avatar, {onChange: onAvatarBlur, onBlur: onAvatarBlur}), 'file', 'Please upload your profile picture here.')}
      {cropElement}
      <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
  );
};

const validate = (attributes) => {

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({makeTrainer, changeAvatar, cropImage}, dispatch);
};

const mapStateToProps = (state) => {
  return { crop: state.crop};
};

export default reduxForm({
  form: 'CreateTrainer',
  fields: ['displayName', 'name', 'location', 'driveForClient', 'offerFitnessAssessment', 'offerNutritionPlan', 'price', 'takingNewClients', 'phoneNumber', 'avatar']
}, mapStateToProps, mapDispatchToProps)(CreateTrainer);
