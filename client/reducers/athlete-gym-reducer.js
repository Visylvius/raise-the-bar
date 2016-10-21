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
    case `TOGGLE_ACTIVE_LOCAL`:
      return { userGyms: state.userGyms.map((gym) => {
        if (action.placeId === gym.placeId) {
          return Object.assign({}, gym, {currentlyWorkingOut: true});
        }
        return gym;
      })
    };
    default:
    return state;
  }
};
