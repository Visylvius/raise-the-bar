import axios from 'axios';

export const FETCH_GYMS = 'FETCH_GYMS';
export const FETCH_GYM = 'FETCH_GYM';
export const SAVE_GYM = 'SAVE_GYM';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';
export const DELETE_GYM = 'DELETE_GYM';

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
    const request = axios.post(`/api/gym/${placeId}`, {email, gym, type, startedWorkingOut: null})
    .then((response) => response.data);
      return {
        type: SAVE_GYM,
        payload: request
    };
  };

export const toggleGymToActive = (placeId, email) => {
  const { type } = JSON.parse(localStorage.getItem('type'));
  console.log('email', email, 'type', type);
  console.log('placeId', placeId, 'es6 {placeId}', {placeId});
  const request = axios.put(`/api/gym/toggleactive/${placeId}`, {email, type, placeId})
    .then(response => response.data)
  return {
    type: TOGGLE_ACTIVE,
    payload: request
  };
};

export const deleteGym = (placeId, email, userType) => {
  console.log('gym Id in action', typeof placeId);
  // .delete(`/api/gym/${userType}/${email}/${placeId}`)
  const request = axios({
    method: 'delete',
    url: '/api/gym',
    data: {
      id: placeId,
      userType,
      email
    }
  })
    .then(response => response.data)
  return {
    type: DELETE_GYM,
    payload: request
  };
};
//change to post to get, url encode the parameters
