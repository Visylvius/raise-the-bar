import axios from 'axios';
import ReduxThunk from 'redux-thunk';
import { blur, change } from 'redux-form';

export const CREATE_ATHLETE = 'CREATE_ATHLETE';
export const FETCH_ATHLETES = 'FETCH_ATHLETES';
export const AVATARCROP_CHANGE = 'AVATARCROP_CHANGE';

export const makeAthlete = (attributes) => {
  return (dispatch, getState) => {
    const request = axios.post('/api/athlete', Object.assign({}, attributes, {crop: getState().crop}))
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
