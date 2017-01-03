import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const CLOSE_MENU_BAR = 'CLOSE_MENU_BAR';
export const OPEN_MENU_BAR = 'OPEN_MENU_BAR';

export const getUser = (email) => {
  const request = axios.get(`/api/user/${email}`)
    .then(response => response.data);
  return {
    type: FETCH_USER,
    payload: request
  };
};
