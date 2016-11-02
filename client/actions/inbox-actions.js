import axios from 'axios';

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGES';
export const SHOW_MESSAGE_THREAD = 'SHOW_MESSAGE_THREAD';

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

export const sendMessage = (type, id, to, from, attributes) => {
  // const type = JSON.parse(localStorage.getItem('type'));
  const request = axios.post(`/api/inbox/${type}/${id}`, Object.assign({}, {to, type, from}, attributes))
    .then(response => response.data)
  return {
    type: SEND_MESSAGE,
    payload: request
  };
};

// export const sendMessages = (user) => {
//   const request = axios.post(`/api/inbox/${type}/${id}`)
//     .then(response => response.data)
//   return {
//     type: SEND_MESSAGES,
//     payload: request
//   };
// };
