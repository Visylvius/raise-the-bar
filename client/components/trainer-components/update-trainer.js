import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import { updateTrainer } from '../../actions/trainer-actions';
import { makeInput, createValidate } from '../utils/form-utils';

const UpdateTrainer = ({fields: {
  displayName,
  name,
  location,
  email,
  driveForClient,
  offerFitnessAssessment,
  offerNutritionPlan,
  price,
  takingNewClients,
  phoneNumber,
  about,
  liftingStyles,
  experience
}, handleSubmit, updateTrainer, trainer, router}, context) => {

  if (trainer === null) {
    return null;
  }
  const { id } = trainer;
  const { trainer_bio } = trainer;

  const onSubmit = (attributes) => {
    updateTrainer(attributes, id)
      .then(() => {
        context.router.push(`/trainer/${id}`);
      });
  };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)} id='updateTrainerForm'>
      {makeInput(displayName, 'text', 'Display Name')}
      {makeInput(name, 'text', 'Name')}
      {makeInput(location, 'text', 'Location')}
      {makeInput(email, 'email', 'Email')}
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
      {makeInput(about, 'textArea', 'update your about here')}
      {makeInput(experience, 'textArea', 'update your bio here')}
      {makeInput(liftingStyles, 'textArea', 'update your liftingStyles here')}
      <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
  );
};



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateTrainer}, dispatch)
};

const mapStateToProps = (state) => {
  console.log(state);
  const trainer = state.trainer.trainer;
  return { trainer };
};

UpdateTrainer.contextTypes = {
  router: PropTypes.object
};

export default reduxForm({
  form: 'UpdateTrainer',
  fields: ['displayName', 'name', 'location', 'email', 'driveForClient', 'offerFitnessAssessment', 'offerNutritionPlan',
   'price', 'takingNewClients', 'phoneNumber', 'about', 'experience', 'liftingStyles'],

}, mapStateToProps, mapDispatchToProps)(UpdateTrainer)
