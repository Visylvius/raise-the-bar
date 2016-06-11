import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { createAthlete } from '../actions/athlete-actions';

const CreateAthlete = ({fields: {
  displayName,
  name,
  liftingStyle,
  location,
  trainer,
  hasTrainer,
  preferedGyms
}, handleSubmit, createAthlete }, { router }) => {
  const onSubmit = (attributes) => {
    createAthlete(attributes);
  };
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <div className='form-group'>
        <label>Display Name</label>
        <input type='text' {...displayName} className='form-control'></input>
      </div>
    </form>
  )
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createAthlete}, dispatch);
}

export default reduxForm({
  form: 'CreateAthlete',
  fields: ['displayName']
}, null, mapDispatchToProps)(CreateAthlete);
