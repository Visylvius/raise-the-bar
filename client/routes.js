import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { initialize } from 'redux-form';
import auth from './AuthService';

import GymSearch from './containers/GymSearch';
import Login from './components/login';
import AthleteSearch from './containers/AthleteSearch';
import IndividualAthlete from './containers/IndividualAthlete';
import CreateAthlete from './components/athlete-components/create-athlete';
import UpdateAthlete from './components/athlete-components/update-athlete';
import DisplayAthletes from './components/athlete-components/display-athletes';
import AthleteProfile from './components/athlete-components/athlete-profile-page';
import CreateTrainer from './components/trainer-components/create-trainer';
import DisplayTrainers from './components/trainer-components/display-trainers';
import DisplayTrainer from './components/trainer-components/display-trainer';
import UpdateTrainer from './components/trainer-components/update-trainer';
import HomePage from './components/home-page';
import MenuBar from './components/menu-bar';
import MainLayout from './components/main-layout';

const requireAuth = (nextState, replace) => {
  console.log('logged in', auth.loggedIn());
  if (nextState.location.hash) {
    const hashString = nextState.location.hash;
    const idString = '&id_token';
    const firstIndex = hashString.indexOf(idString) + idString.length + 1;
    const lastIndex = hashString.indexOf('&token_type=');
    console.log(hashString.substring(firstIndex, lastIndex));
    localStorage.setItem('id_token', hashString.substring(firstIndex, lastIndex));
  }
  if (!auth.loggedIn()) {
    console.log(nextState, 'nextState', replace, 'replace');
    replace({ pathname: '/login' });
    return false;
  }
  return true;
};

import { fetchAthletes, fetchAthlete } from './actions/athlete-actions';
import { fetchTrainers } from './actions/trainer-actions';
import { fetchTrainer } from './actions/trainer-actions';
import store from './reducers';

const fetchBoundAthletes = function() {
  store.dispatch(fetchAthletes());
};

const fetchBoundAthlete = function() {
  return store.dispatch(fetchAthlete.apply(null, arguments));
};

const fetchBoundTrainers = function() {
  store.dispatch(fetchTrainers());
};

const fetchBoundTrainer = function() {
  return store.dispatch(fetchTrainer.apply(null, arguments));
};

export default (
  <Router history={browserHistory} createElement={function(Component, props) { props.auth = auth; return <Component {...props} /> }}>
    <Route path='/' component={MainLayout}>
      <IndexRoute
        component={HomePage}
        onEnter={() => document.querySelector('body').className = 'homePage'}
        onLeave={() => document.querySelector('body.homePage').className = ''}
      />
      <Route path='login' component={Login} />
      <Route component={MenuBar}>
        <Route path='createathlete' onEnter={(nextState, replace) => requireAuth(nextState, replace)} component={CreateAthlete} />
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
        <Route path='findtrainers' onEnter={fetchBoundTrainers} component={DisplayTrainers} />
        <Route path='trainer/:id' onEnter={(nextState, replace) => requireAuth(nextState, replace) && fetchBoundTrainer(nextState.params.id)} component={DisplayTrainer} />
        <Route path='trainer/update/:id' onEnter={(nextState, replace) => {
              requireAuth(nextState, replace) && fetchBoundTrainer(nextState.params.id)
                .then((response) => {
                  const { value: trainer } = response;
                  store.dispatch(initialize('UpdateTrainer', Object.assign({}, trainer, trainer.trainer_bio),
                  ['displayName', 'name', 'location', 'email', 'driveForClient', 'offerFitnessAssessment', 'offerNutritionPlan',
                  'price', 'takingNewClients', 'phoneNumber', 'about', 'liftingStyles', 'experience']));
                });
            }}
              component={UpdateTrainer} />
        <Route path='/createtrainer' component={CreateTrainer} />
        <Route path='/gymsearch' component={GymSearch} />
      </Route>
    </Route>
  </Router>
);




//Line 55
//requireAuth(nextState, replace) &&

//line 67-70
// onEnter={requireAuth}
// onEnter={requireAuth}
// onEnter={requireAuth}
//athlete/:id onEnter=(nextState, replace) => requireAuth(nextState, replace) &&
