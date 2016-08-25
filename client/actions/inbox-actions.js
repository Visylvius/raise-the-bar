import axios from 'axios';

export const GET_MESSAGES = 'GET_MESSAGES';

export const getMessages = (email) => {
  const request = axios.get(`/api/inbox/${email}`)
    .then(response => response.data)
  return {
    type: GET_MESSAGES,
    payload: request
  };
};
