import React from 'react';
import Radium from 'radium';


import { connect } from 'react-redux';

const Inbox = ({messages}) => {
  if (messages === null) {
    return null;
  }
  return (
    <div className='user-container' style={styles.container}>
      <ul className='user-list' style={styles.userList}>
        {messages.map((message) => {
          return (
            <li className='user' style={styles.user}>
              <div className='avatar' style={styles.avatarContainer}><img style={styles.avatar} className='user-photo' src={`avatars/athlete/test.jpg`}/></div>
              <div className='message-container' style={styles.messageContainer}>
                <h4 className='user-name' style={styles.userName}>{message.from}</h4>
                <div className='user-message'>{message.body}</div>
              </div>
            </li>
          )
        })}
      </ul>
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

const mapStateToProps = (state) => {
  const messages = state.inbox.messages;
  return { messages };
};

export default connect(mapStateToProps, null)(Inbox);
