import React from 'react';
// import { connect } from 'react-redux';
const GymList = (gyms) => {
  console.log('gyms in GymList', gyms);
  if (gyms.listOfGyms === null) {
    return null;
  }
  const renderGyms = gymData => {
    console.log(gymData)
  }
  console.log(gyms.listOfGyms);
  return (
    <table className='table table-hover'>
      <thead>
        <tr>
          <th>Gym Name</th>
          <th>Gym Address</th>
        </tr>
      </thead>
      <tbody>
      {gyms.map(this.renderGyms(gyms))}
      </tbody>
    </table>
  );
}

export default GymList;

// function mapStateToProps({gyms}) {
//   return { gyms };
// }


// export default connect(mapStateToProps)(GymList);
