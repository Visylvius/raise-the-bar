import React from 'react';
import Radium, { Style } from 'radium';
import { Link } from 'react-router';

const baseStyles = {
  mainInput: {
    marginTop: '-690px',
    zIndex: 0,
    textAlign: 'center',
    color: '#FFF'
  },
  backgroundImage: {
    position: ['absolute', 'fixed'],
    height: 980,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    minWidth: '50%',
    minHeight: '50%',
    zIndex: -1
  },
  buttons: {
    textAlign: 'center',
    marginLeft: '5px'
  }
};
const HomePage = () => {
  return (
    <div className='background-image-container' style={baseStyles.backgroundImageContainer}>
      <img src='https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=415deff5885d1355e29aa376385648ce' style={baseStyles.backgroundImage}></img>
      <h3 type='text' style={baseStyles.mainInput}>Raise The Bar</h3>
      <div style={baseStyles.buttons}>
        <Link to='/findathletes'><button className='btn btn-default'>Find Athletes</button></Link>
        <button className='btn btn-default'>Find Trainers</button>
      </div>
    </div>
  );
};


export default Radium(HomePage);
