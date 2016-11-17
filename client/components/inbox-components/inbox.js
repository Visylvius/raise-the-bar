import React from 'react';
import Radium from 'radium';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MessageIcon from 'material-ui/svg-icons/content/mail'

import SendMessage from '../inbox-components/send-message';
import { SHOW_MESSAGE_THREAD, HIDE_MESSAGE_THREAD } from '../../actions/inbox-actions';
import store from '../../reducers';

import { connect } from 'react-redux';

const Inbox = ({myState}) => {
  if (myState.messages === null) {
    return null;
  }

  const sendUserMessage = (event) => {
    event.preventDefault();
    console.log('event', event);
  }

  console.log('myState', myState);

  const findMessageById = (messages, messageId) => {
    console.log('myState', myState);
    console.log('messages', messages, 'messageId', messageId);
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === messageId) {
        console.log('in if', 'message[i]', messages[i], 'messageId', messageId);
        return (
          <ModalContainer className='thing-1' style={{backgroundColor: '#fff'}}>
           <ModalDialog style={styles.modalContainer}>
             <div className='message-header' style={styles.messageHeader}>
               <div className='message-avatar' style={styles.messageAvatar}>
                 <img
                   className='message-header-avatar'
                   src={`avatars/${messages[i].userSendingMessageType}/${messages[i].imgId}.jpg`}
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
                   {messages[i].displayName}
                 </p>
                 <p
                 className='time-stamp'
                 style={styles.messageTimeStamp}
                 >
                 It was created at ....
                 </p>
               </div>
             </div>
             <div
               className='message-body'
               style={styles.messageBody}
             >
               {messages[i].body}
             </div>
             <div className='message-footer'>
               <SendMessage
                 recipientId={messages[i].userSendingMessageId}
                 recipientType={messages[i].userSendingMessageType}
                 inboxLayout={true}
                 profileLayout={false}
               />
             </div>
           </ModalDialog>
         </ModalContainer>
        )
      }
    }
  }

  // const message = findMessageById(myState.messages, myState.messageId)
  return (
    <div className='user-container' style={styles.container}>
      <ul className='user-list' style={styles.userList}>
        {myState.messages.map((message) => {
          return (
            <li className='user' style={styles.user}>
              <div className='avatar' style={styles.avatarContainer}><img style={styles.avatar} className='user-photo' src={`avatars/${message.userSendingMessageType}/${message.imgId}.jpg`}/></div>
              <div className='message-container' style={styles.messageContainer}>
                <h4 className='user-name' style={styles.userName}>{message.displayName}</h4>
                <div className='user-message'
                  onTouchTap={() => store.dispatch({type: SHOW_MESSAGE_THREAD, messageId: message.id})}
                  style={{cursor: 'pointer'}}
                >
                  <div className='user-message-wrapper'>
                    {message.body}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      {/* TODO Change the esc to be disabled, or onClose on the container dispatch the hide message thread */}
      { myState.modalShowing ? findMessageById(myState.messages, myState.messageId) : null }
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '640px',
    margin: '0 auto'
  },
  messageHeader: {
    borderBottom: '1px solid #ECECEC',
    paddingBottom: '18px'
  },
  messageUserName: {
    fontSize: '22px',
    marginBottom: 0,
    color: '#fff'
  },
  messageTimeStamp: {
    fontSize: '18px',
    color: '#fff',
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
    overflow: 'hidden',
    backgroundColor: '#303030',
    top: '0px'
  },
  messageBody: {
    textAlign: 'center',
    color: '#fff',
    marginTop: '15px'
  },
  userList: {
    padding: 0,
    listStyle: 'none'
  },
  user: {
    height: '160px',
    borderTop: '1px solid black',
    paddingTop: '18px'
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
    paddingLeft: '10px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  avatar: {
    height: 'auto',
    width: '100%'
  },
  userName: {
    marginBottom: '5px'
  }
};
//current modal dialogue


const mapStateToProps = (state) => ({myState: state.inbox });


export default connect(mapStateToProps, null)(Inbox);
