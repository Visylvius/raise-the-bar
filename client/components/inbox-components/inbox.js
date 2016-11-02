import React from 'react';
import Radium from 'radium';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

import { SHOW_MESSAGE_THREAD } from '../../actions/inbox-actions';
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
          <ModalDialog>
            <div>Hello World!</div>
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
