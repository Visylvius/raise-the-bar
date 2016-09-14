import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import { sendMessage } from '../actions/inbox-actions';
import { makeInput, createValidate } from './utils/form-utils';

const SendMessage = ({fields: {
  body
}, handleSubmit, sendMessage, router, routeParams}, context) => {
  const onSubmit = (attributes) => {
      console.log('attributes', attributes);
      const messageRecipient = `/api/${routeParams.type}/${routeParams.id}`
      const messageAuthor = JSON.parse(localStorage.getItem('profile'));
      const { email } = messageAuthor;
      console.log(email, 'email');
      sendMessage(routeParams.type, routeParams.id, messageRecipient, email, attributes);
      socket.emit('message', {body: attributes.body, to: messageRecipient, from: email});
    };

    // sendMessage(nextState.type, nextState.id, attributes);

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      {makeInput(body, 'textArea', 'Enter Your Message Here')}
      <button type='submit'>Send Message</button>
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
