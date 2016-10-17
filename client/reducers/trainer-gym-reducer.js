import { DISPLAY_TRAINER_GYMS } from '../actions/trainer-actions';

const initialState = { userGyms: null, error: null, loaded: null };

export const displayTrainerGymsReducer = (state=initialState, action) => {
  switch (action.type) {
    case `${DISPLAY_TRAINER_GYMS}_PENDING`:
      return initialState;
    case `${DISPLAY_TRAINER_GYMS}_FULFILLED`:
      return { userGyms: action.payload, error: null, loaded: true};
    case `${DISPLAY_TRAINER_GYMS}_REJECTED`:
      return { userGyms: null, error: action.payload, loaded: false};
    default:
    return state;
  }
};
