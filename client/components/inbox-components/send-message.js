import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import MessageIcon from 'material-ui/svg-icons/content/mail';
import Snackbar from 'material-ui/Snackbar';

import { sendMessage, HIDE_MESSAGE_THREAD, HIDE_SNACKBAR, SHOW_SNACKBAR } from '../../actions/inbox-actions';
import { makeInput, createValidate } from '../utils/form-utils';
import store from '../../reducers';

const SendMessage = ({fields: {
  body
}, handleSubmit, sendMessage, router, routeParams, recipientId, recipientType, profileLayout, inboxLayout, inbox, resetForm}) => {
  const onSubmit = (attributes) => {
      console.log('recipientId', recipientId);
      console.log('recipientType', recipientType);
      const userInformation = JSON.parse(localStorage.getItem('profile'));
      const userType = JSON.parse(localStorage.getItem('type'));
      const { email } = userInformation;
      const { type } = userType;
      const timeSent = Date.now();
      const messageRecipient = `/api/${recipientType}/${recipientId}`;
      resetForm();
      store.dispatch({type: SHOW_SNACKBAR})
      sendMessage(recipientType, recipientId, messageRecipient, email, attributes, type, timeSent);
    };
    console.log('profileLayout', profileLayout);
    console.log('inbox', inbox);

    const hideSnackBar = () => store.dispatch({type: HIDE_SNACKBAR});

  return (
    <form
      className='form'
      onSubmit={handleSubmit(onSubmit)}
      style={{backgroundColor: '#303030', padding: '0 15px 15px'}}
    >
      {makeInput(body, 'sendMessage', 'Enter Your Message Here')}
      <div style={{backgroundColor: '#303030', textAlign: 'center'}}>
      { inboxLayout ? <span>
                        <RaisedButton
                          label="Send"
                          primary={true}
                          icon={<MessageIcon />}
                          type='submit'
                          style={{marginRight: '10px'}}
                        />
                        <RaisedButton
                          label='close'
                          primary={true}
                          onTouchTap={() => {store.dispatch({type: HIDE_MESSAGE_THREAD})}}
                        />
                      </span>
                    : null
      }

      { profileLayout ?
                        <RaisedButton
                          label="Send"
                          primary={true}
                          icon={<MessageIcon />}
                          type='submit'
                          style={{marginRight: '10px', display: 'block'}}
                        />
                      : null
      }
      </div>
      { inbox.snackBarShowing ?
        <Snackbar
         open={inbox.snackBarShowing}
         message="Message was successfully sent"
         autoHideDuration={1500}
         style={{backgroundColor: '#262626', width: '40%', margin: 'auto'}}
         bodyStyle={{backgroundColor: '#262626'}}
         onRequestClose={() => hideSnackBar()}
        />
        : null }
    </form>
  );
};


const mapDispatchToProps = (dispatch) => bindActionCreators({sendMessage}, dispatch);
const mapStateToProps = (state) => {
  const inbox = state.inbox;
  return { inbox };
};

export default reduxForm({
  form: 'SendMessage',
  fields: ['body'],
  validate: createValidate({
    body: 'please enter your message'
  })

}, mapStateToProps, mapDispatchToProps)(SendMessage);
