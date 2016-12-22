import React from 'react';
import { deleteAthlete } from '../actions/athlete-actions';
import { deleteTrainer } from '../actions/trainer-actions';

import store from '../reducers';

const userSettings = () => {
  const type = localStorage.getItem('type');

  return (
    <div>
    { type === 'athlete'
      ?
      <div
        style={{cursor: 'pointer'}}
        onTouchTap={() => { store.dispatch(deleteAthlete(JSON.parse(localStorage.getItem('profile')))) }}
      >
          Delete Your Profile?
        </div>
      :
      <div
        style={{cursor: 'pointer'}}
        onTouchTap={() => { store.dispatch(deleteTrainer(JSON.parse(localStorage.getItem('profile')))) }}
      >
          Delete Your Profile?
        </div>
    }
    </div>
  );
};

export default userSettings;
