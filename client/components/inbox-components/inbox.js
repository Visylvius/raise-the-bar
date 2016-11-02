import React from 'react';
import Radium from 'radium';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import { SHOW_MESSAGE_THREAD, HIDE_MESSAGE_THREAD } from '../../actions/inbox-actions';
import store from '../../reducers';

import { connect } from 'react-redux';

const Inbox = ({myState}) => {
  if (myState.messages === null) {
    return null;
  }

  return (
    <div className='user-container' style={styles.container}>
      <ul className='user-list' style={styles.userList}>
        {myState.messages.map((message) => {
          return (
            <li className='user' style={styles.user}>
              <div className='avatar' style={styles.avatarContainer}><img style={styles.avatar} className='user-photo' src={`avatars/${message.userType}/${message.imgId}.jpg`}/></div>
              <div className='message-container' style={styles.messageContainer}>
                <h4 className='user-name' style={styles.userName}>{message.displayName}</h4>
                <div className='user-message'
                  onTouchTap={() => store.dispatch({type: SHOW_MESSAGE_THREAD, messageId: message.id})}
                  >{message.body}</div>
              </div>
            </li>
          )
        })}
      </ul>
      { myState.modalShowing ?
        <ModalContainer>
          <ModalDialog style={styles.modalContainer}>
            <div className='message-header' style={styles.messageHeader}>
              <div className='message-avatar' style={styles.messageAvatar}>
                <img
                  className='message-header-avatar'
                  src={`avatars/athlete/test.jpg`}
                  style={styles.avatarImage}
                />
              </div>
              <div
                className='message-header-text'
                style={{display: 'inline-block', verticalAlign: 'middle'}}
              >
                <p
                  className='message-username'
                  style={styles.messageUserName}
                >
                  UserName
                </p>
                <p
                className='time-stamp'
                style={styles.messageTimeStamp}
                >
                It was created at ....
                </p>
              </div>
            </div>
            <div className='message-body'>Hello World!</div>
            <div className='message-footer'></div>
            <button
              onTouchTap={() => store.dispatch({type: HIDE_MESSAGE_THREAD, showModal: false })}
            >
              close
            </button>
          </ModalDialog>
        </ModalContainer> : null
      }

    </div>
  );
};

const styles = {
  container: {
    border: '1px solid black',
    height: '500px',
    width: '100%',
    maxWidth: '640px',
    backgroundColor: 'red',
    margin: '0 auto'
  },
  messageHeader: {
    borderBottom: '1px solid #ECECEC',
    paddingBottom: '18px'
  },
  messageUserName: {
    fontSize: '22px',
    marginBottom: 0
  },
  messageTimeStamp: {
    fontSize: '18px',
    color: '#888',
    marginBottom: 0
  },
  messageAvatar: {
    width: '80px',
    overflow: 'hidden',
    height: '80px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '14px',
    verticalAlign: 'middle'
  },
  avatarImage: {
    width: '120%',
    height: 'auto'
  },
  modalContainer: {
    maxWidth: '500px',
    width: '100%',
    height: '100%',
    zIndex: 2,
    overflow: 'hidden'
  },
  userList: {
    padding: 0,
    listStyle: 'none'
  },
  user: {
    height: '160px'
  },
  avatarContainer: {
    height: '100%',
    display: 'inline-block',
    width: '30%',
    verticalAlign: 'top'
  },
  messageContainer: {
    height: '100%',
    display: 'inline-block',
    width: '70%',
    verticalAlign: 'top',
    paddingLeft: '10px'
  },
  avatar: {
    height: 'auto',
    width: '100%'
  },
  userName: {
    marginBottom: '5px'
  }
};

//TODO make sure if number of characters is > 66 then show ...

const mapStateToProps = (state) => ({myState: state.inbox });


export default connect(mapStateToProps, null)(Inbox);
