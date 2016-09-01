import axios from 'axios';

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGE = 'SEND_MESSAGES';

export const getMessages = (email) => {
  const request = axios.get(`/api/inbox/${email}`)
    .then(response => response.data)
  return {
    type: GET_MESSAGES,
    payload: request
  };
};

export const sendMessage = (type, id, to, from, attributes) => {
  const request = axios.post(`/api/inbox/${type}/${id}`, Object.assign({}, {to: to, from: from}, attributes))
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
