import axios from 'axios';

export const CREATE_ATHLETE = 'CREATE_ATHLETE';
export const FETCH_ATHLETES = 'FETCH_ATHLETES';

export const createAthlete = (attributes) => {
  const request = axios.post('/api/athlete', attributes)
    .then(response => response.data);
  return {
    type: CREATE_ATHLETE,
    payload: request
  };
};

export const fetchAthletes = () => {
  const request = axios.get('/api/athlete')
    .then(response => response.data);
  return {
    type: FETCH_ATHLETES,
    payload: request
  };
};
