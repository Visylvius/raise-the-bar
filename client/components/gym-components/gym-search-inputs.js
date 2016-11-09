import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { makeInput, createValidate } from '../utils/form-utils';
import { fetchGyms } from '../../actions/gyms-actions';
import store from '../../reducers';

const GymSearchInputs = ({fields: {
  homeAddress,
  distance
}, handleSubmit}) => {
  const onSubmit = (attributes) => {
    console.log('fetchGyms', fetchGyms);
    store.dispatch(fetchGyms(attributes.homeAddress, attributes.distance));
    console.log('attributes', attributes);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {makeInput(homeAddress, 'smallTextArea', 'enter your home address here.')}
      {makeInput(distance, 'textAreaNumber', 'enter the distance in meters.')}
      <div style={{textAlign: 'center'}}>
        <RaisedButton
          label="Send"
          primary={true}
          type='submit'
        />
      </div>
    </form>

  );
};

export default reduxForm({
  form: 'GymSearchInputs',
  fields: ['homeAddress', 'distance'],
  validate: createValidate({
    homeAddress: 'please enter an address',
    distance: 'please enter a unit of distance'
  })
}, null, null)(GymSearchInputs);
