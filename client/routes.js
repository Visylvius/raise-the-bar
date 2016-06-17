import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import GymSearch from './containers/GymSearch';
import CreateAthlete from './components/athlete-components/create-athlete';
import CreateTrainer from './components/trainer-components/create-trainer';
import HomePage from './components/home-page';
import DisplayAthletes from './components/athlete-components/display-athletes';
import DisplayTrainers from './components/trainer-components/display-trainer';
import AthleteSearch from './containers/AthleteSearch';
import { fetchAthletes } from './actions/athlete-actions';
import store from './reducers';

const fetchBoundAthletes = function() {
  store.dispatch(fetchAthletes.apply(arguments));
};

export default (
  <Router history={browserHistory}>
    <Route path='/' component={HomePage} onEnter={() => document.querySelector('body').className = 'homePage'} onLeave={() => document.querySelector('body.homePage').className = ''}></Route>
    <Route path='/createathlete' component={CreateAthlete} />
    <Route path='/createtrainer' component={CreateTrainer} />
    <Route path='/gymsearch' component={GymSearch} />
    <Route path='/findathletes' onEnter={fetchBoundAthletes} component={AthleteSearch} />
    <Route path='/findtrainers' component={DisplayTrainers} />
  </Router>
);
