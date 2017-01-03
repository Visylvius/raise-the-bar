import { DISPLAY_ATHLETE_GYMS } from '../actions/athlete-actions';
import { DELETE_GYM, SHOW_DELETE_GYM_MODAL, HIDE_DELETE_GYM_MODAL } from '../actions/gyms-actions';

const initialState = {
  userGyms: null,
  error: null,
  loaded: null,
  deleteGymModal: null,
  gymId: null
};

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
          return Object.assign({}, gym, {startedWorkingOut: (Date.now() / 1000)});
        }
        return gym;
      }), error: null, loaded: true
    };
    case SHOW_DELETE_GYM_MODAL:
      return Object.assign({}, state, {deleteGymModal: true, gymId: action.gymId});
    case HIDE_DELETE_GYM_MODAL:
      return Object.assign({}, state, { userGyms: action.userGyms.filter((gym) => gym.id !== action.gymId) });
    case `${DELETE_GYM}_PENDING`:
      return state;
    case `${DELETE_GYM}_FULFILLED`:
      return Object.assign({}, state, { deleteGymModal: false, gymId: null})
    case `${DELETE_GYM}_REJECTED`:
      return { userGyms: null, error: action.payload, loaded: false};
    default:
    return state;
  }
};
