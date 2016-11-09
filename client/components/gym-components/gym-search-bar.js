import React from 'react';
import TextField from 'material-ui/TextField';

const GymSearchBar = ({fetchGyms}) => {
  const storeValue = (value) => {
    console.log('value', value);
  };
  const onSubmit = event => {
    event.preventDefault();
    console.log(event);
    const form = event.target;
    fetchGyms(form.address.value, form.distance.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <input name='address' type='text' placeholder='enter address'/>
      <input name='distance' type='number' placeholder='enter distance' />
      <button type='submit'>Get Gyms</button>
    </form>
  );
};


//add form 2 inputs one with the address, numeric input for distance
export default GymSearchBar;
