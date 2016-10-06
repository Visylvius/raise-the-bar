import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import React, { PropTypes as T } from 'react'

import auth from '../AuthService'




const styles = {
  backgroundShade: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%'
  },
  mainTitle: {
    zIndex: 0,
    textAlign: 'center',
    color: 'white',
    fontSize: '40px'
  },
  footerWrapper: {
    zIndex: 0,
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  footer: {
    width: '90%',
    margin: '0 auto',
    height: '65px',
    color: 'white',
    border: '1px solid white',
    background: 'rgba(82, 82, 82, 0.4)',
    textAlign: 'center'
  },
  button: {
    width: '90%',
    marginTop: '8px'
  }
};

export class Login extends React.Component {
  //bottom
  //position: absolute
  //transparency

  render() {
    return (
      <div className='main-wrapper' style={styles.backgroundShade}>
        <h2 className='main-title' style={styles.mainTitle}>Find A Gym Buddy <br />On The Go</h2>
        <div className='footer-wrapper' style={styles.footerWrapper}>
          <div className='footer' style={styles.footer}>
            <button
              className="btn btn-secondary btn-lg"
              style={styles.button}
              onClick={auth.login.bind(this)}
            >Click here to sign in</button>
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
