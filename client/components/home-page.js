import React from 'react';
import Radium, { Style } from 'radium';
import { Link } from 'react-router';

const baseStyles = {
  mainInput: {
    zIndex: 0,
    textAlign: 'center',
    color: '#FFF'
  },
  buttons: {
    textAlign: 'center',
    marginLeft: '5px'
  }
};
const HomePage = () => {
  return (
    <div>
      <h3 type='text' style={baseStyles.mainInput}>Raise The Bar</h3>
      <div style={baseStyles.buttons}>
        <Link to='/findathletes'><button className='btn btn-primary'>Find Athletes</button></Link>
        <button className='btn btn-primary'>Find Trainers</button>
      </div>
    </div>
  );
};


export default Radium(HomePage);
