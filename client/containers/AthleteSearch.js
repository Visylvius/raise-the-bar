import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAthletes } from '../actions/athlete-actions';
import DisplayAthletes from '../components/athlete-components/display-athletes';

const AthleteSearch = (props) => {
  return (
    <DisplayAthletes athletes={props.athletes} fetchAthletes={props.fetchAthletes}/>
  );
};

const mapStateToProps = state => {
  const { athletes, error, loading} = state.athletes;
  return { athletes, error, loading };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchAthletes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AthleteSearch);
