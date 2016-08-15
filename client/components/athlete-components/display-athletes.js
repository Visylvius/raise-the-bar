import React from 'react';
import UserCard from '../user-card';
const DisplayAthletes = ({athletes}) => {
  if (athletes === null) {
    return null;
  }

  const athleteCard = athletes.map((athlete) => {
    //const profileLink = `/athlete/${athlete.id}`
    return (
      <UserCard
        key={athlete.id}
        id={athlete.id}
        userType='athlete'
        displayName={athlete.displayName}
        liftingStyle={athlete.liftingStyle}
        cardDescription={athlete.cardDescription}
        />
    )
  })

  return (
    <div>
      {athleteCard}
    </div>
  );
};

export default DisplayAthletes;
