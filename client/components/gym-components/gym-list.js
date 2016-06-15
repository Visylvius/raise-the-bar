import React from 'react';
// import { connect } from 'react-redux';
const GymList = ( { listOfGyms } ) => {
  if (listOfGyms === null) {
    return null;
  }
  const renderGyms = gymData => {
    console.log(gymData);
    return (
      <tr>
       <td>{gymData.name}</td>
       <td>{gymData.address}</td>
      </tr>
    );
  };
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>Gym Name</th>
          <th>Gym Address</th>
        </tr>
      </thead>
      <tbody>
      {listOfGyms.map(renderGyms)}
      </tbody>
    </table>
  );
};

export default GymList;
