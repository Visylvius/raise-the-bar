import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { initialize } from 'redux-form';
import auth from './AuthService';

import GymSearch from './containers/GymSearch';
import Login from './components/login';
import AthleteSearch from './containers/AthleteSearch';
import IndividualAthlete from './containers/IndividualAthlete';
import CreateAthlete from './components/athlete-components/create-athlete';
import CreateTrainer from './components/trainer-components/create-trainer';
import UpdateAthlete from './components/athlete-components/update-athlete';
import HomePage from './components/home-page';
import DisplayAthletes from './components/athlete-components/display-athletes';
import DisplayTrainers from './components/trainer-components/display-trainer';
import MenuBar from './components/menu-bar';
import MainLayout from './components/main-layout';
import AthleteProfile from './components/athlete-components/athlete-profile-page';



const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
    return false;
  }
  return true;
};

import { fetchAthletes, fetchAthlete } from './actions/athlete-actions';
import store from './reducers';

const fetchBoundAthletes = function() {
  store.dispatch(fetchAthletes());
};

const fetchBoundAthlete = function() {
  return store.dispatch(fetchAthlete.apply(null, arguments));
}


export default (
  <Router history={browserHistory}>
    <Route path='/' component={MainLayout}>
      <IndexRoute
        component={HomePage}
        onEnter={() => document.querySelector('body').className = 'homePage'}
        onLeave={() => document.querySelector('body.homePage').className = ''}
      />
      <Route path='login' component={Login} />
      <Route component={MenuBar}>
        <Route path='findathletes' onEnter={fetchBoundAthletes} component={AthleteSearch} />
        <Route path='athlete/:id' onEnter={(nextState, replace) => requireAuth(nextState, replace) && fetchBoundAthlete(nextState.params.id)} component={AthleteProfile} />
        <Route path='athlete/update/:id' onEnter={(nextState, replace) => {
            requireAuth(nextState, replace) && fetchBoundAthlete(nextState.params.id)
              .then((response) => {
                //same thing as const athlete = response.value
                const { value: athlete } = response;
                store.dispatch(initialize('UpdateAthlete', Object.assign({}, athlete, athlete.athlete_bio),
                  ['displayName', 'name', 'liftingStyle', 'location', 'trainer', 'hasTrainer', 'preferedGyms',
                  'avatar', 'about', 'liftingStyles', 'experience']));
              });
          }}
              component={UpdateAthlete} />
        </Route>
    </Route>
    <Route path='/createathlete' onEnter={requireAuth} component={CreateAthlete} />
    <Route path='/createtrainer' onEnter={requireAuth} component={CreateTrainer} />
    <Route path='/gymsearch' onEnter={requireAuth} component={GymSearch} />
    <Route path='/findtrainers' onEnter={requireAuth} component={DisplayTrainers} />
  </Router>
);
