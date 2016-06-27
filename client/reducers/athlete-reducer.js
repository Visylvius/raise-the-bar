import { FETCH_ATHLETES, AVATARCROP_CHANGE } from '../actions/athlete-actions';


const initialState = { athletes: null, error: null, loaded: false}

export const athleteReducer = (state=initialState, action) => {
  switch (action.type) {
    case `${FETCH_ATHLETES}_PENDING`:
      return initialState;
    case `${FETCH_ATHLETES}_FULFILLED`:
      return { athletes: action.payload, error: null, loaded: true};
    case `${FETCH_ATHLETES}_REJECTED`:
      return { athletes: null, error: action.payload, loaded: false};
    default:
    return state;
  }
};
