import React from 'react';
import UserCard from '../user-card';
const DisplayAthletes = ({athletes}) => {
  if (athletes === null) {
    return null;
  }

  const athleteCard = athletes.map((athlete) => {
    //const profileLink = `/athlete/${athlete.id}`
    return (
      <UserCard key={athlete.id} id={athlete.id} displayName={athlete.displayName} liftingStyle={athlete.liftingStyle}/>
    )
  })

  return (
    <div>
      {athleteCard}
    </div>
  );
};

export default DisplayAthletes;
