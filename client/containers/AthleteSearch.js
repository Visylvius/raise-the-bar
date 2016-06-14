import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAthletes } from '../actions/athlete-actions';
import DisplayAthletes from '../components/display-athletes';

const AthleteSearch = () => {
  return (
    <DisplayAthletes athletes={athlete} / >
  );
};

const mapStateToProps = state => {
  const { athlete, error, loading} = state.gyms
  return { athlete, error, loading};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchAthletes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AthleteSearch);
