import React from 'react';
import Radium, { Style } from 'radium';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

const baseStyles = {
  mainInput: {
    zIndex: 0,
    textAlign: 'center',
    color: '#FFF',
    display: 'table',
    width: '100%'
  },
  pageContent: {
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle'
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
      <div className='home-page-wrapper' style={[baseStyles.boxOpacity, baseStyles.mainInput]}>
        <div className='home-page-content' style={baseStyles.pageContent}>
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
      </div>
  );
};


export default Radium(HomePage);
