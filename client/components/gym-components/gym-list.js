import React from 'react';

import GymCard from './gym-card.js';

const GymList = ( { listOfGyms } ) => {
  if (listOfGyms === null) {
    return null;
  }
  console.log('list of gyms', listOfGyms);
  const renderGyms = gymData => {
    console.log('gym data', gymData);
    return (
      <GymCard
        id={gymData.id}
        key={gymData.id}
        placeId={gymData.place_id}
        name={gymData.name}
        address={gymData.address}
      />
    );
  };
  return (
    <div>
      {listOfGyms.results.map(renderGyms)}
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
