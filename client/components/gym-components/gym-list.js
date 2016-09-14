import React from 'react';

import GymCard from './gym-card.js';

const GymList = ( { listOfGyms } ) => {
  if (listOfGyms === null) {
    return null;
  }
  const renderGyms = gymData => {
    console.log(gymData);
    return (
      <GymCard
        id={gymData.id}
        placeId={gymData.placeId}
        name={gymData.name}
        address={gymData.address}
      />
    );
  };
  return (
    <div>
      {listOfGyms.map(renderGyms)}
    </div>


  );
};

// {/* <div>
//   <span>Name</span>
//   <div>{gymData.name}</div>
//   <span>address</span>
//   <div>{gymData.address}</div>
// </div> */}

export default GymList;
