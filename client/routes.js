import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import GymSearch from './containers/GymSearch';
import CreateAthlete from './components/create-athelete';
export default (
  <Router history={browserHistory}>
    <Route path='/createathlete' component={CreateAthlete} />
    <Route path='/gymsearch' component={GymSearch} />
  </Router>
);
