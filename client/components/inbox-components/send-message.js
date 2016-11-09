import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import MessageIcon from 'material-ui/svg-icons/content/mail';

import { sendMessage } from '../../actions/inbox-actions';
import { makeInput, createValidate } from '../utils/form-utils';

const SendMessage = ({fields: {
  body
}, handleSubmit, sendMessage, router, routeParams, recipientId, recipientType}, props, context) => {
  const onSubmit = (attributes) => {
      console.log('recipientId', recipientId);
      console.log('recipientType', recipientType);
      const userInformation = JSON.parse(localStorage.getItem('profile'));
      const userType = JSON.parse(localStorage.getItem('type'));
      const { email } = userInformation;
      const { type } = userType;
      const messageRecipient = `/api/${recipientType}/${recipientId}`;
      sendMessage(recipientType, recipientId, messageRecipient, email, attributes, type);
    };

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      {makeInput(body, 'textArea', 'Enter Your Message Here')}
      <div style={{textAlign: 'center'}}>
        <RaisedButton
          label="Send"
          primary={true}
          icon={<MessageIcon />}
          type='submit'
        />
      </div>
    </form>
  );
};


const mapDispatchToProps = (dispatch) => bindActionCreators({sendMessage}, dispatch);


export default reduxForm({
  form: 'SendMessage',
  fields: ['body'],
  validate: createValidate({
    body: 'please enter your message'
  })

}, null, mapDispatchToProps)(SendMessage);
