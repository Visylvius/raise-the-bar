import React, { PropTypes } from 'react';
import auth from '../AuthService';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import GroupIcon from 'material-ui/svg-icons/social/group';
import UserProfileIcon from 'material-ui/svg-icons/action/account-circle';
import BackIcon from 'material-ui/svg-icons/image/navigate-before';

import { EventEmitter } from 'events';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  getUser,
  CLOSE_MENU_BAR,
  OPEN_MENU_BAR,
  OPEN_NEW_USER_MODAL,
  CLOSE_NEW_USER_MODAL
} from '../actions/user-actions';
import { getMessages } from '../actions/inbox-actions';

import store from '../reducers';
import Modal from './modal';


class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    console.log('auth', auth);
    console.log('props in menu bar', props)
    const userType = JSON.parse(localStorage.getItem('type'));
    console.log('userType', userType);
    // if (userType === null) {
    //   this.createUserProfile(userType);
    // }
    auth.on('server-profile-non-existent', (serverProfile) => {
      console.log('serverProfile', serverProfile);
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
    if (this.props.isShowingDrawer === false) {
      store.dispatch({type: OPEN_MENU_BAR});
    } else if (this.props.isShowingDrawer) {
      store.dispatch({type: CLOSE_MENU_BAR});
    }
    // this.setState({isShowingDrawer: !this.state.isShowingDrawer});
  }


  userButton() {
     if (localStorage.getItem('id_token')) {
       return (
         <MenuItem
           onTouchTap={() => this.logout()}
           innerDivStyle={styles.lastMenuItem}
         >
           Logout
         </MenuItem>
       )
     } else {
       return (
         <MenuItem
           onTouchTap={auth.login.bind(auth)}
           innerDivStyle={styles.lastMenuItem}
         >
           Login
         </MenuItem>
       )
      //  return <a className='nav-link' href='#' onClick={auth.login.bind(auth)}>Login</a>;
     }
   }

   createUserProfile(serverProfile) {
     if (serverProfile === 'not found') {
       store.dispatch({type: OPEN_NEW_USER_MODAL});
     }
   }

   createAthlete() {
     store.dispatch({type: CLOSE_NEW_USER_MODAL});
     this.context.router.push(`/createathlete`);
   }

   createTrainer() {
     store.dispatch({type: CLOSE_NEW_USER_MODAL});
     this.context.router.push(`/createtrainer`);
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
     this.props.getUser(email)
      .then((user) => {
        if (user.value.type === 'athlete') {
          const { id } = user.value.athlete;
          store.dispatch({type: CLOSE_MENU_BAR});
          this.context.router.push(`/athlete/${id}`);
        } else if (user.value.type === 'trainer') {
          const { id } = user.value.trainer;
          store.dispatch({type: CLOSE_MENU_BAR});
          this.context.router.push(`/trainer/${id}`);
        }
      });
   }

   directToInbox() {
     store.dispatch({type: CLOSE_MENU_BAR});
     this.context.router.push(`/inbox`);
   }

   findAthletes() {
     store.dispatch({type: CLOSE_MENU_BAR});
     this.context.router.push(`/findathletes`);
   }

   findTrainers() {
     store.dispatch({type: CLOSE_MENU_BAR});
     this.context.router.push('/findtrainers');
   }

   findGyms() {
     store.dispatch({type: CLOSE_MENU_BAR});
     this.context.router.push('/gymsearch')
   }

  render(){
    return (
    <div>
    {console.log('props', this.props)}
      <AppBar
        title="Raise The Bar"
        style={{zIndex: 1}}
        iconElementLeft={
          <IconButton
            tooltip='Back'
            onTouchTap={() => this.context.router.goBack()}
          >
            <BackIcon/>
          </IconButton>
        }
        iconElementRight={
          <IconButton onTouchTap={() => this.toggleDrawer()}><MenuIcon/></IconButton>
        }
      />
      <Drawer
        open={this.props.isShowingDrawer}
        width={400}
        className='Drawer'
      >
       <div
        // style={{backgroundColor: '<div id="303030"></div>', height: '100vh'}}
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
          onTouchTap={() => this.findGyms()}
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
        {this.userButton()}
       </div>
      </Drawer>
        <div>
        {
          this.props.isShowingModal ?
          <ModalContainer onClose={this.handleClose.bind(this)}>
            <ModalDialog
              style={styles.modalStyles}
              onClose={this.handleClose.bind(this)}
            >
              <p
                style={{color: '#fff'}}
              >
              Whoops!
              <br />
              It looks like you haven't created a profile with us yet
              </p>
              <p style={{color: '#fff'}}>
              Are you an Athlete, or a Trainer?</p>
              <div style={{textAlign: 'center'}}>
                <RaisedButton
                  onTouchTap={() => { this.createAthlete(); }}
                  style={{marginRight: '5px'}}
                  label='Create Athlete'
                  labelColor='white'
                  primary={true}
                />

                <RaisedButton
                  onTouchTap={() => { this.createTrainer() }}
                  style={{marginRight: '5px'}}
                  label='Create Trainer'
                  labelColor='white'
                  primary={true}
                />
              </div>
            </ModalDialog>
          </ModalContainer>
          : null
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
  },
  modalStyles: {
    maxWidth: '500px',
    width: '100%',
    height: '100%',
    zIndex: 2,
    overflow: 'hidden',
    backgroundColor: '#303030',
    top: '0px'
  }
};

const mapStateToProps = (state) => {
  const { user, error, loading } = state.user;
  const { isShowingDrawer, isShowingModal } = state.menu;
  return { user, error, loading, isShowingDrawer, isShowingModal };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
