import axios from 'axios';

export const FETCH_GYMS = 'FETCH_GYMS';

export const fetchGyms = (address, distance) => {
  const axiosPromise = axios.post('/gym', {address, distance})
    .then((response) => response.data);
  return {
    type: FETCH_GYMS,
    payload: axiosPromise
  };
};


//change to post to get, url encode the parameters
