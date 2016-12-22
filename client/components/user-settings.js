import React from 'react';
import { deleteAthlete } from '../actions/athlete-actions';

import store from '../reducers';

const userSettings = () => {

  return (
    <div>
      <div
        style={{cursor: 'pointer'}}
        onTouchTap={() => { store.dispatch(deleteAthlete(JSON.parse(localStorage.getItem('profile')))) }}
      >
        Delete Your Profile?
      </div>
    </div>
  )
};

export default userSettings;
