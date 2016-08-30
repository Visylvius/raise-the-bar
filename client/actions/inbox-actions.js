import axios from 'axios';

export const GET_MESSAGES = 'GET_MESSAGES';
export const SEND_MESSAGES = 'SEND_MESSAGES';

export const getMessages = (email) => {
  const request = axios.get(`/api/inbox/${email}`)
    .then(response => response.data)
  return {
    type: GET_MESSAGES,
    payload: request
  };
};

export const sendMessages = (type, id, from, body) => {
  const request = axios.post(`/api/inbox/${type}/${id}`)
    .then(response => response.data)
  return {
    type: SEND_MESSAGES,
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
