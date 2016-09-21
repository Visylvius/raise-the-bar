import React, { PropTypes } from 'react';
import auth from '../AuthService';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getUser } from '../actions/user-actions';


class MenuBar extends React.Component {
   userButton() {
     if (localStorage.getItem('id_token')) {
       return <a className='nav-link' href='#' onClick={this.logout.bind(this)}>Logout</a>;
     } else {
       return <a className='nav-link' href='#' onClick={auth.login.bind(this)}>Login</a>;
     }
   }

   logout(){
     // destroys the session data
     console.log('in logout');
     console.log('props', this.props);
     this.props.auth.logout()
     // redirects to login page
     this.context.router.push('/');
   }

   userProfile() {
     const userProfile = JSON.parse(localStorage.getItem('profile'));
     const { email } = userProfile;
     console.log();
     console.log('props', this.props);
     this.props.getUser(email)
      .then((user) => {
        if (user.value.type === 'athlete') {
          const { id } = user.value.athlete;
          this.context.router.push(`/athlete/${id}`)
        }
      });
   }

  render(){
    return (
      <div>
        <nav className="navbar navbar-dark bg-inverse">
          <ul className="nav navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Athletes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Trainers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Find Gyms Near You</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href="#" onClick={this.userProfile.bind(this)}>Profile</a>
            </li>
            <li className='nav-item'>
              {this.userButton()}
            </li>
          </ul>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MenuBar.contextTypes = {
  router: PropTypes.object
};

MenuBar.PropTypes = {
  // auth: PropTypes.instanceOf(auth)
};


const mapStateToProps = (state) => {
  const { user, error, loading } = state.user;
  return { user, error, loading };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
