import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import MessageIcon from 'material-ui/svg-icons/content/mail'

import { sendMessage } from '../../actions/inbox-actions';
import { makeInput, createValidate } from '../utils/form-utils';

const SendMessage = ({fields: {
  body
}, handleSubmit, sendMessage, router, routeParams, userId}, props, context) => {
  const onSubmit = (attributes) => {
      console.log('userId', userId);
      const userInformation = JSON.parse(localStorage.getItem('profile'));
      const userType = JSON.parse(localStorage.getItem('type'));
      const { email } = userInformation;
      const { type } = userType
      const messageRecipient = `/api/${type}/${userId}`
      sendMessage(type, userId, messageRecipient, email, attributes);
      // socket.emit('message', {body: attributes.body, to: messageRecipient, from: email});
    };

    // sendMessage(nextState.type, nextState.id, attributes);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      {makeInput(body, 'textArea', 'Enter Your Message Here')}
      <RaisedButton
        label="Send"
        primary={true}
        icon={<MessageIcon />}
        type='submit'
      />
    </form>
  );
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({sendMessage}, dispatch);
}

export default reduxForm({
  form: 'SendMessage',
  fields: ['body'],
  validate: createValidate({
    body: 'please enter your message'
  })

}, null, mapDispatchToProps)(SendMessage);
