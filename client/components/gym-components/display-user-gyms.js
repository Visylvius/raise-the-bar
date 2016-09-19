import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { displayAthleteGyms } from '../../actions/athlete-actions';

const DisplayUserGyms = (props) => {
  return (
    <div> This is display user gyms </div>
  );
};


const mapStateToProps = (state) => {
  const { userGyms, error, loaded } = state.athleteGym;
  return { userGyms, error, loaded };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({displayAthleteGyms}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayUserGyms);
