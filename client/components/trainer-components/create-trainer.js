import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import { makeTrainer } from '../../actions/trainer-actions';
import { makeInput, createValidate } from '../utils/form-utils';

const CreateTrainer = ({fields: {
  displayName,
  name,
  location,
  email,
  driveForClient,
  offerFitnessAssessment,
  offerNutritionPlan,
  price,
  takingNewClients,
  phoneNumber
}, handleSubmit, makeTrainer }, { router }) => {
  const onSubmit = (attributes) => {
    makeTrainer(attributes);
  };
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
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
      <button type='submit' className='btn btn-primary'>Submit</button>
    </form>
  );
};

const validate = (attributes) => {

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({makeTrainer}, dispatch);
}

export default reduxForm({
  form: 'CreateTrainer',
  fields: ['displayName', 'name', 'location', 'email', 'driveForClient', 'offerFitnessAssessment', 'offerNutritionPlan', 'price', 'takingNewClients', 'phoneNumber']
}, null, mapDispatchToProps)(CreateTrainer)
