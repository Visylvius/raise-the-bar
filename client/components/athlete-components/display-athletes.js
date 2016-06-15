import React from 'react';

const DisplayAthletes = ({athletes, fetchAthletes}) => {
  if (athletes === null) {
    return null;
  }
  const displayData = athletesData => {
    console.log(athletesData);
  }
  return (
    <div>
      {athletes.map(displayData)}
    </div>
  );
};

export default DisplayAthletes;
