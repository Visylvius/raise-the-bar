import axios from 'axios';
import ReduxThunk from 'redux-thunk';

export const CREATE_ATHLETE = 'CREATE_ATHLETE';
export const FETCH_ATHLETES = 'FETCH_ATHLETES';

export const makeAthlete = (attributes) => {
  const fileReader = new FileReader();
  return (dispatch) => {
    const file = attributes.avatar[0]
    fileReader.onload = (output) => {
      const data = Object.assign({}, attributes, {
        avatar: output.target.result
      });
      const request = axios.post('/api/athlete', data)
        .then(response => response.data);
        dispatch({
          type: CREATE_ATHLETE,
          payload: request
        });
    };
    fileReader.readAsDataURL(file);
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
