
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

export default Login;
