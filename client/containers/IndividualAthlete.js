import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAthlete } from '../actions/athlete-actions';
import DisplayAthlete from '../components/athlete-components/display-athlete';

const IndividualAthlete = (props) => {
  return (
    <DisplayAthlete athlete={props.athletes}/>
  );
};

 const mapStateToProps = (state) => {
   const { athlete, error, loading } = state.athlete;
   return { athlete, error, loading };
 };

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({fetchAthlete}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualAthlete);
