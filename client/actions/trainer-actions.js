import axios from 'axios'

export const CREATE_TRAINER = 'CREATE_TRAINER';

export const makeTrainer = (attributes) => {
  const request = axios.post('/api/trainer', attributes)
    .then(response => response.data);

  return {
    type: CREATE_TRAINER,
    payload: request
  };
};
