import React from 'react';
import Radium, { Style } from 'radium';
import { Link } from 'react-router';

const baseStyles = {
  mainInput: {
    zIndex: 0,
    textAlign: 'center',
    color: '#FFF',
    paddingTop: '290px',
    paddingRight: '120px'
  },
  buttons: {
    textAlign: 'center',
    marginLeft: '5px'
  },
  boxOpacity: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%'
  }
};
const HomePage = () => {
  return (
      <div style={[baseStyles.boxOpacity, baseStyles.mainInput]}>
        <h3 type='text'>Raise The Bar</h3>
          <div style={baseStyles.buttons}>
            <Link to='/findathletes'><button className='btn btn-primary'>Find Athletes</button></Link>
            <Link to='/findtrainers'><button className='btn btn-primary'>Find Trainers</button></Link> 
          </div>
      </div>
  );
};


export default Radium(HomePage);
