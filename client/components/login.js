import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import React, { PropTypes as T } from 'react'

import auth from '../AuthService'

const baseStyles = {
  mainWrapper: {
    zIndex: 0,
    textAlign: 'center',
    color: '#FFF',
    display: 'table',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  buttons: {
    textAlign: 'center',
    marginLeft: '5px'
  },
  boxOpacity: {
    height: '100%'
  },
  mainCentered: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  }
};

export class Login extends React.Component {
  //bottom
  //position: absolute
  //transparency

  render() {
    return (
      <div className='main-container' style={baseStyles.mainWrapper}>
        <div className='main-centered' style={baseStyles.mainCentered}>
          <h3 type='text'>Raise The Bar</h3>
          <div style={baseStyles.buttons}>
            <p>You must be logged in to continue</p>
            <button className='btn btn-primary' onClick={auth.login.bind(this)}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

//line 14
// { false ? <div> You need to create a user profile </div> : null }

//could creator a constructor that takes auth and listens for an event and then acts accordingly

//or your auth.login could return a promise

//could replace line 13
//would not pass parameters unlike the current click event;
//onClick = {() => auth.login() }


//onClick = {() => auth.login() .then((result) => { behavior goes here type of user non existent }) }
//use this to determine to use setState = showPopUp / !showPopUp


//research for third party react pop up tag <ReactPopUp></ReactPopUp>
//ideally it should handle dismissale on its own
//use state on component or on the redux store and see if the user profile exists
  //if not then use the state on either the store or the component to as such
  // state.showCreationPopUp ? <div> create profile </div> : null
  //
export default Login;
