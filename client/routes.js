import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import GymSearch from './containers/GymSearch';
import CreateAthlete from './components/create-athlete';
import CreateTrainer from './components/create-trainer';
import HomePage from './components/home-page';
import DisplayAthletes from './components/display-athletes';
import DisplayTrainers from './components/display-trainer';

export default (
  <Router history={browserHistory}>
    <Route path='/' component={HomePage}></Route>
    <Route path='/createathlete' component={CreateAthlete} />
    <Route path='/createtrainer' component={CreateTrainer} />
    <Route path='/gymsearch' component={GymSearch} />
    <Route path='/findathletes' component={DisplayAthletes} />
    <Route path='/findtrainers' component={DisplayTrainers} />
  </Router>
);
