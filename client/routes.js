import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import GymSearch from './containers/GymSearch';
import CreateAthlete from './components/athlete-components/create-athlete';
import CreateTrainer from './components/trainer-components/create-trainer';
import HomePage from './components/home-page';
import DisplayAthletes from './components/athlete-components/display-athletes';
import DisplayTrainers from './components/trainer-components/display-trainer';
import AthleteSearch from './containers/AthleteSearch';
import MenuBar from './components/menu-bar';
import MainLayout from './components/main-layout';
import AthleteProfile from './components/athlete-components/athlete-profile-page';

import { fetchAthletes, fetchAthlete } from './actions/athlete-actions';
import store from './reducers';

const fetchBoundAthletes = function() {
  store.dispatch(fetchAthletes());
};

const fetchBoundAthlete = function() {
  store.dispatch(fetchAthlete.apply(null, arguments));
}


export default (
  <Router history={browserHistory}>
    <Route path='/' component={MainLayout}>
      <IndexRoute
        component={HomePage}
        onEnter={() => document.querySelector('body').className = 'homePage'}
        onLeave={() => document.querySelector('body.homePage').className = ''}
      />
      <Route component={MenuBar}>
        <Route path='findathletes' onEnter={fetchBoundAthletes} component={AthleteSearch} />
        <Route path='athlete/:id' onEnter={(nextState) => fetchBoundAthlete(nextState.params.id)} component={AthleteProfile} />
      </Route>
    </Route>
    <Route path='/createathlete' component={CreateAthlete} />
    <Route path='/createtrainer' component={CreateTrainer} />
    <Route path='/gymsearch' component={GymSearch} />
    <Route path='/findtrainers' component={DisplayTrainers} />
  </Router>
);
