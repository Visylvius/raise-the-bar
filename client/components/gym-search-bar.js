import React from 'react';

const GymSearchBar = ({fetchGyms}) => {
  const onSubmit = event => {
    event.preventDefault();
    const form = event.target;
    fetchGyms(form.address.value, form.distance.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input name='address' type='text' placeholder='enter address'/>
      <input name='distance' type='number' />
      <button type='submit'>Get Gyms</button>
    </form>
  );
};


//add form 2 inputs one with the address, numeric input for distance
export default GymSearchBar;
