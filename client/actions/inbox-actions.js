import axios from 'axios';

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGES';
export const SHOW_MESSAGE_THREAD = 'SHOW_MESSAGE_THREAD';
export const HIDE_MESSAGE_THREAD = 'HIDE_MESSAGE_THREAD';

export const getMessages = (profile, userType) => {
  const { email } = profile;
  const { type } = userType;
  console.log('type', type);
  console.log('email', email);
  const request = axios.get(`/api/inbox/${type}/${email}`)
    .then(response => response.data)
  return {
    type: GET_MESSAGES,
    payload: request
  };
};

export const sendMessage = (recipientType, recipientId, to, from, attributes, userType, timeSent) => {
  const { type } = JSON.parse(localStorage.getItem('type'));
  console.log('from', from);
  console.log('timeSent', timeSent);
  const request = axios.post(`/api/inbox/${recipientType}/${recipientId}`, Object.assign({},
    {to, recipientType, recipientId, from, userType, userSendingMessageType: type, timeSent}, attributes))
    .then(response => response.data)
  return {
    type: SEND_MESSAGE,
    payload: request
  };
};
