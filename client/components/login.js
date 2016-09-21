
import React, { PropTypes as T } from 'react'
// import {ButtonToolbar, Button} from 'react-bootstrap'
import auth from '../AuthService'


export class Login extends React.Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
          <div>
            <button onClick={auth.login.bind(this)}>Login</button>
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
