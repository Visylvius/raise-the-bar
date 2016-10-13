import { DISPLAY_ATHLETE_GYMS } from '../actions/athlete-actions';

const initialState = { userGyms: null, error: null, loaded: null };

export const displayAthleteGymsReducer = (state=initialState, action) => {
  switch (action.type) {
    case `${DISPLAY_ATHLETE_GYMS}_PENDING`:
      return initialState;
    case `${DISPLAY_ATHLETE_GYMS}_FULFILLED`:
      return { userGyms: action.payload, error: null, loaded: true};
    case `${DISPLAY_ATHLETE_GYMS}_REJECTED`:
      return { userGyms: null, error: action.payload, loaded: false};
    default:
    return state;
  }
};
