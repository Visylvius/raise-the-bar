import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAthlete } from '../actions/athlete-actions';
import AthleteProfile from '../components/athlete-components/athlete-profile-page';

const IndividualAthlete = (props) => {
  console.log('props', props);
  return (
    <AthleteProfile athlete={props.athletes} routeParams={props.routeParams}/>
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
