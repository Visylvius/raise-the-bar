import axios from 'axios'

export const CREATE_TRAINER = 'CREATE_TRAINER';
export const FETCH_TRAINERS = 'FETCH_TRAINERS';

export const makeTrainer = (attributes) => {
  const request = axios.post('/api/trainer', attributes)
    .then(response => response.data);

  return {
    type: CREATE_TRAINER,
    payload: request
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
