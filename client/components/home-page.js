import React from 'react';
import Radium, { Style } from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
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
            <Link to='/findathletes'>
              <RaisedButton
                label='Find Athletes'
                labelColor='#0A96F1'
                style={{marginRight: '7px'}}
              />
            </Link>
            <Link to='/findtrainers'>
            <RaisedButton
              label='Find Trainers'
              labelColor='#0A96F1'
              style={{marginRight: '7px'}}
            />
            </Link>
          </div>
      </div>
  );
};


export default Radium(HomePage);
