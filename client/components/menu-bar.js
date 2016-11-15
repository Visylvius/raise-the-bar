import React, { PropTypes } from 'react';
import auth from '../AuthService';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import GroupIcon from 'material-ui/svg-icons/social/group';
import UserProfileIcon from 'material-ui/svg-icons/action/account-circle';

import { EventEmitter } from 'events';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getUser } from '../actions/user-actions';
import { getMessages } from '../actions/inbox-actions';

import store from '../reducers';
import Modal from './modal';


class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isShowingModal: false, isShowingDrawer: false };

    auth.on('server-profile-non-existent', (serverProfile) => {
      this.createUserProfile(serverProfile);
    });
  }

  handleClick() {
    this.setState({isShowingModal: true});
  }

  handleClose() {
    this.setState({isShowingModal: false});
  }

  toggleDrawer() {
    this.setState({isShowingDrawer: !this.state.isShowingDrawer});
  }


  userButton() {
     if (localStorage.getItem('id_token')) {
       return <a className='nav-link' href='#' onClick={this.logout.bind(this)}>Logout</a>;
     } else {
       return <a className='nav-link' href='#' onClick={auth.login.bind(auth)}>Login</a>;
     }
   }

   createUserProfile(serverProfile) {
     if (serverProfile === null) {
       this.setState({isShowingModal: true});
     }
   }

   createAthlete() {
     this.setState({isShowingModal: false});
     this.context.router.push(`/createathlete`);
   }

   createTrainer() {
     this.setState({isShowingModal: false});
     this.context.router.push(`/createtrainer`)
   }
   logout(){
     // destroys the session data
     console.log('in logout');
     this.props.auth.logout()
     // redirects to login page
     console.log(this.context);
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
          this.context.router.push(`/athlete/${id}`);
        } else if (user.value.type === 'trainer') {
          const { id } = user.value.trainer;
          this.context.router.push(`/trainer/${id}`);
        }
      });
   }

   directToInbox() {
     this.setState({isShowingDrawer: false});
     this.context.router.push(`/inbox`);
   }

   findAthletes() {
     this.setState({isShowingDrawer: false});
     this.context.router.push(`/findathletes`);
   }

   findTrainers() {
     this.setState({isShowingDrawer: false});
     this.context.router.push('/findtrainers');
   }

  render(){
    return (
    <div>
      <AppBar
        title="Raise The Bar"
        style={{zIndex: 1}}
        iconElementLeft={
          <IconButton onTouchTap={() => this.toggleDrawer()}><MenuIcon/></IconButton>
        }
        // onLeftIconButtonTouchTap={() => console.log('clicked')}
        // children={
        //   <Drawer
        //     open={this.state.isShowingDrawer}
        //     openSecondary={true}
        //     className='Drawer'
        //     style={{backgroundColor: 'blue'}}
        //   >
        //     <MenuItem
        //       leftIcon={<GroupIcon />}
        //       onTouchTap={() => { this.findAthletes() }}
        //       style={{backgroundColor: 'blue'}}
        //       className='Thing'
        //     >
        //       Find Athletes
        //     </MenuItem>
        //     <MenuItem>
        //       Find Trainers
        //     </MenuItem>
        //     <MenuItem
        //       onTouchTap={() => this.context.router.push(`/gymsearch`)}>Find Gyms</MenuItem>
        //     <MenuItem
        //       onTouchTap={() => this.userProfile() }
        //     >
        //       Profile
        //     </MenuItem>
        //     <MenuItem
        //       onTouchTap={() => this.directToInbox()}
        //     >
        //       Inbox
        //     </MenuItem>
        //   </Drawer>
        // }
      />
      <Drawer
        open={this.state.isShowingDrawer}
        openSecondary={true}
        className='Drawer'
      >
      <div
        style={{backgroundColor: '#303030', height: '100vh'}}
        className='menu-item-wrapper'
      >
      <MenuItem
        leftIcon={<GroupIcon />}
        onTouchTap={() => this.findAthletes()}
        innerDivStyle={styles.menuItems}
      >
        Find Athletes
      </MenuItem>
      <MenuItem
        onTouchTap={() => this.findTrainers()}
        innerDivStyle={styles.menuItems}
      >
        Find Trainers
      </MenuItem>
      <MenuItem
        onTouchTap={() => this.context.router.push('/gymsearch')}
        innerDivStyle={styles.menuItems}
      >
        Find Gyms
      </MenuItem>
      <MenuItem
        onTouchTap={() => this.userProfile() }
        innerDivStyle={styles.menuItems}
      >
        Profile
      </MenuItem>
      <MenuItem
        onTouchTap={() => this.directToInbox()}
        innerDivStyle={styles.lastMenuItem}
      >
        Inbox
      </MenuItem>
      </div>
      </Drawer>
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
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose.bind(this)}>
            <ModalDialog onClose={this.handleClose.bind(this)}>
              <p>Whoops! <br />It looks like you haven't create a profile with us yet</p>
              <p>Are you an Athlete, or a Trainer?</p>
              <button onClick={() => { this.createAthlete() }}>Create Athlete</button>
              <button onClick={() => { this.createTrainer() }}>Create Trainer</button>
            </ModalDialog>
          </ModalContainer>
        }
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

const styles = {
  menuItems: {
    borderTop: '1px solid #262626',
    borderBottom: '1px solid #262626',
    backgroundColor: '#303030',
    color: '#EEEEEE'
  },
  lastMenuItem: {
    borderTop: '1px solid #262626',
    borderBottom: '2px solid #262626',
    backgroundColor: '#303030',
    color: '#EEEEEE'
  }
};

const mapStateToProps = (state) => {
  const { user, error, loading } = state.user;
  return { user, error, loading };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
