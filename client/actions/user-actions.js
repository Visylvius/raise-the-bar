import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';

export const getUser = (email) => {
  const request = axios.get(`/api/user/${email}`)
    .then(response => response.data);
  return {
    type: FETCH_USER,
    payload: request
  }
}
