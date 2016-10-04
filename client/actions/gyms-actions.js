import axios from 'axios';

export const FETCH_GYMS = 'FETCH_GYMS';
export const FETCH_GYM = 'FETCH_GYM';
export const SAVE_GYM = 'SAVE_GYM';

export const fetchGyms = (address, distance) => {
  const axiosPromise = axios.post('/api/gym', {address, distance})
    .then((response) => response.data);
  return {
    type: FETCH_GYMS,
    payload: axiosPromise
  };
};

export const fetchGym = (placeId) => {
  const request = axios.get(`/api/gym/${placeId}`)
    .then((response) => response.data);
  return {
    type: FETCH_GYM,
    payload: request
  };
};

export const saveGym = (placeId, email, gym) => {
  console.log('gym', gym);
  const type = JSON.parse(localStorage.getItem('type'));
  console.log('type', type);
    const request = axios.post(`/api/gym/${placeId}`, {email, gym})
      .then((response) => response.data)
    return {
      type: SAVE_GYM,
      payload: request
    };

};



//change to post to get, url encode the parameters
