import axios from 'axios'
import { blur, change } from 'redux-form';
import AuthService  from '../AuthService';
import randomString from 'randomstring';

export const CREATE_TRAINER = 'CREATE_TRAINER';
export const FETCH_TRAINERS = 'FETCH_TRAINERS';
export const FETCH_TRAINER = 'FETCH_TRAINER';
export const UPDATE_TRAINER = 'UPDATE_TRAINER';
export const DISPLAY_TRAINER_GYMS = 'SHOW_TRAINER_GYMS';

export const makeTrainer = (attributes) => {
  return (dispatch, getState) => {
    const { email } = AuthService.getProfile();
    const userImgId = randomString.generate({
        length: 60,
        charset: 'hex'
      });
    const request = axios.post('/api/trainer', Object.assign({email}, {imgId: userImgId}, attributes, {crop: getState().crop}))
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
  return (dispatch, getState) => {
    // console.log('attributes', attributes);
    // console.log('object.assign update athlete action', Object.assign(attributes, {crop: getState().crop}))
    const userImgId = randomString.generate({
        length: 60,
        charset: 'hex'
      });
    const request = axios.put(`/api/trainer/${id}`, Object.assign(attributes, {imgId: userImgId}, {crop: getState().crop}))
    .then((response) => response.data);
    return {
      type: UPDATE_TRAINER,
      payload: request
    };
  };
};

export const displayTrainerGyms = (profile) => {
  const { email } = profile;
  const request = axios.get(`/api/trainer/gyms/${email}`)
    .then((response) => response.data)
  return {
    type: DISPLAY_TRAINER_GYMS,
    payload: request
  };
};
