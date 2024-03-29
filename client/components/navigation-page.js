import React, { PropTypes } from 'react';
import auth from '../AuthService';
import IconButton from 'material-ui/IconButton';
import FitnessIcon from 'material-ui/svg-icons/places/fitness-center';
import PersonIcon from 'material-ui/svg-icons/social/person-outline';
import TrainerIcon from 'material-ui/svg-icons/social/group';
import ProfileIcon from 'material-ui/svg-icons/image/portrait';
import MessageIcon from 'material-ui/svg-icons/content/mail';
import LoginIcon from 'material-ui/svg-icons/action/lock-outline';
import LogoutIcon from 'material-ui/svg-icons/action/lock-open';

import store from '../reducers';
import {
  getUser,
  OPEN_NEW_USER_MODAL,
  CLOSE_NEW_USER_MODAL
} from '../actions/user-actions';

const gridContent = document.querySelectorAll('.col');
console.log('gridContent', gridContent);

const NavigationPage = (props, context) => {
  const userButton = () => {
     if (localStorage.getItem('id_token')) {
       return (
         <div
           className="col"
           onTouchTap={() => logout()}
         >
           <div className="module">
            <LogoutIcon
              style={{
                  width: '250px',
                  height: '250px',
                  color: '#fff'
                }}
            />
            <p className='navigation-text'>
              Logout
            </p>
           </div>
         </div>
       )
     } else {
       return (
         <div
           className="col"
           onTouchTap={() => auth.login()}
         >
           <div className="module">
            <LoginIcon
              style={{
                  width: '250px',
                  height: '250px',
                  color: '#fff'
                }}
            />
            <p className='navigation-text'>
              Login
            </p>
           </div>
         </div>
       )
     }
   }

   const userProfile = () => {
     const userProfile = JSON.parse(localStorage.getItem('profile'));
     const { email } = userProfile;
     store.dispatch(getUser(email))
      .then((user) => {
        if (user.value.type === 'athlete') {
          const { id } = user.value.athlete;
          context.router.push(`/athlete/${id}`);
        } else if (user.value.type === 'trainer') {
          const { id } = user.value.trainer;
          context.router.push(`/trainer/${id}`);
        }
      });
   }

   const logout = () => {
     // destroys the session data
     console.log('in logout');
     props.auth.logout()
     // redirects to login page
     context.router.push('/');
   }

  return (
    <div className='backgroundImg'>
      <div className="flex-grid">
       <div
         className="col"
       >
         <div
           className="module"
           onTouchTap={() => context.router.push('/findathletes')}
         >
          <PersonIcon
            style={{
                width: '250px',
                height: '250px',
                color: '#fff',
              }}
          />
          <p className='navigation-text'>
            Find Athletes
          </p>

         </div>
       </div>
       <div
         className="col"
       >
         <div
           className="module"
           onTouchTap={() => context.router.push('/findtrainers')}
         >
          <TrainerIcon
            style={{
                width: '250px',
                height: '250px',
                color: '#fff'
              }}
          />
          <p className='navigation-text'>
            Find Trainers
          </p>
         </div>
       </div>
       <div className="col">
         <div
           className="module"
           onTouchTap={() => context.router.push('/gymsearch')}
         >
          <FitnessIcon
            style={{
                width: '250px',
                height: '250px',
                color: '#fff'
              }}
          />
          <p className='navigation-text'>
            Find Gyms
          </p>
         </div>
       </div>
       <div className="col">
         <div
           className="module"
           onTouchTap={() => userProfile()}
         >
          <ProfileIcon
            style={{
                width: '250px',
                height: '250px',
                color: '#fff'
              }}
          />
          <p className='navigation-text'>
            Your Profile
          </p>
         </div>
       </div>
       <div className="col">
         <div
           className="module"
           onTouchTap={() => context.router.push('/inbox')}
         >
          <MessageIcon
            style={{
                width: '250px',
                height: '250px',
                color: '#fff'
              }}
          />
          <p className='navigation-text'>
            Inbox
          </p>
         </div>
       </div>
       {userButton()}
      </div>
    </div>
  )
}

NavigationPage.contextTypes = {
  router: PropTypes.object
};

export default NavigationPage;
