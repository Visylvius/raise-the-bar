import axios from 'axios'
import { blur, change } from 'redux-form';
import AuthService  from '../AuthService';

export const CREATE_TRAINER = 'CREATE_TRAINER';
export const FETCH_TRAINERS = 'FETCH_TRAINERS';
export const FETCH_TRAINER = 'FETCH_TRAINER';
export const UPDATE_TRAINER = 'UPDATE_TRAINER';

export const makeTrainer = (attributes) => {
  return (dispatch, getState) => {
    const { email } = AuthService.getProfile();
    const request = axios.post('/api/trainer', Object.assign({email}, attributes, {crop: getState().crop}))
      .then(response => response.data);

    return {
      type: CREATE_TRAINER,
      payload: request
    };
  };
};

export const fetchTrainers = () => {
  const request = axios.get('/api/trainer')
    .then(response => response.data);

  return {
    type: FETCH_TRAINERS,
    payload: request
  };
};

export const fetchTrainer = (id) => {
  const request = axios.get(`/api/trainer/${id}`)
    .then((response) => response.data);

  return {
    type: FETCH_TRAINER,
    payload: request
  };
};


export const updateTrainer = (attributes, id) => {
  attributes.bio = {
    liftingStyles: attributes.liftingStyles,
    experience: attributes.experience,
    about: attributes.about
  };

  const request = axios.put(`/api/trainer/update/${id}`, attributes)
    .then((response) => response.data);

  return {
    type: UPDATE_TRAINER,
    payload: request
  };
};
