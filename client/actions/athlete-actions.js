import axios from 'axios';
import ReduxThunk from 'redux-thunk';
import { blur, change } from 'redux-form';
import AuthService  from '../AuthService';


export const CREATE_ATHLETE = 'CREATE_ATHLETE';
export const FETCH_ATHLETES = 'FETCH_ATHLETES';
export const FETCH_ATHLETE = 'FETCH_ATHLETE';
export const AVATARCROP_CHANGE = 'AVATARCROP_CHANGE';
export const UPDATE_ATHLETE = 'UPDATE_ATHLETE';
export const DISPLAY_ATHLETE_GYMS = 'DISPLAY_ATHLETE_GYMS';

export const makeAthlete = (attributes) => {
  return (dispatch, getState) => {
    const { email } = AuthService.getProfile();
    const request = axios.post('/api/athlete', Object.assign({email}, attributes, {crop: getState().crop}))
      .then(response => response.data);
      return {
        type: CREATE_ATHLETE,
        payload: request
      };
  };
};


export const changeAvatar = (form, field, avatar) => {
  const fileReader = new FileReader();
  return (dispatch) => {
    const avatarFile = avatar[0];
    if (avatarFile) {
      fileReader.onload = (output) => {
        dispatch(blur(form, field, output.target.result));
      };
      fileReader.readAsDataURL(avatarFile);
    }
  };
};

export const cropImage = (form, field, crop) => {
  return {
    type: AVATARCROP_CHANGE,
    payload: crop
  };
};

//promise version

// const makeAthletePromise = (attributes) => {
//   const file = attributes.avatar[0]
//   const promise = new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.onload = (output) => {
//       resolve(output.target.result);
//     }
//     fileReader.readAsDataURL(file);
//   })
//   .then((dataUrl) => {
//     //use object.assign, and make the request
//     const data = Object.assign({}, attributes, {
//       avatar: dataUrl
//     });
//     const request = axios.post('/api/athlete', attributes)
//       .then(response => response.data);
//     return request
//   })
//   return {
//     type: CREATE_ATHLETE,
//     payload: promise
//   }
// };

export const fetchAthletes = () => {
  const request = axios.get('/api/athlete')
    .then((response) => response.data);
  return {
    type: FETCH_ATHLETES,
    payload: request
  };
};

export const fetchAthlete = (id) => {
  const request = axios.get(`/api/athlete/${id}`)
    .then((response) => response.data);
  return {
    type: FETCH_ATHLETE,
    payload: request
  };
};

export const updateAthlete = (attributes, id) => {
  attributes.bio = {
    liftingStyles: attributes.liftingStyles,
    experience: attributes.experience,
    about: attributes.about
  };
  return (dispatch, getState) => {
    // console.log('attributes', attributes);
    // console.log('object.assign update athlete action', Object.assign(attributes, {crop: getState().crop}))
    const request = axios.put(`/api/athlete/update/${id}`, Object.assign(attributes, {crop: getState().crop}))
    .then((response) => response.data);
    return {
      type: UPDATE_ATHLETE,
      payload: request
    };
  }
};

//error: undefined. Is this because Im using stateless components?
// axios.put(`/api/athlete/update/${id}`, Object.assign(attributes, {crop: getState().crop}))
//   .then(response => {
//       dispatch({
//         type: UPDATE_ATHLETE,
//         payload: response.data
//       });
//   });

export const displayAthleteGyms = (profile) => {
  const { email } = profile;
  const request = axios.get(`/api/athlete/gyms/${email}`)
    .then((response) => response.data)
  return {
    type: DISPLAY_ATHLETE_GYMS,
    payload: request
  };
};
