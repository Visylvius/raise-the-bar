import axios from 'axios';

export const CREATE_ATHLETE = 'CREATE_ATHLETE';

export const createAthlete = (attributes) => {
  const request = axios.post('/api/athlete', attributes)
    .then(response => response.data);
  return {
    type: CREATE_ATHLETE,
    payload: request
  };
};
