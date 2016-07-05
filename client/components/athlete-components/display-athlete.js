import React from 'react';
import AthleteProfile from './athlete-profile-page';

const DisplayAthlete = ({athlete}) => {
  if (athlete === null) {
    return null;
  }
  return (
    <AthleteProfile key={athlete.id} displayName={athlete.displayName} name={athlete.name} location={props.location}/> 
  )
}

export default DisplayAthlete;
