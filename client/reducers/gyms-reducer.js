import { FETCH_GYMS } from '../actions/gyms-actions';

const initialState = { listOfGyms: null, error: null, loaded: false};

export const gymsReducer = (state=initialState, action) => {
  switch (action.type) {
    case `${FETCH_GYMS}_PENDING`:
    return initialState;
    case `${FETCH_GYMS}_FULFILLED`:
    return { listOfGyms: action.payload, error: null, loaded: true};
    case `${FETCH_GYMS}_REJECTED`:
    return { listOfGyms: null, error: action.payload, loaded: false};
    default:
    return state;
  }
};
