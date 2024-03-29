import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGyms } from '../actions/gyms-actions';
import { fetchGym } from '../actions/gyms-actions';
import GymSearchInputs from '../components/gym-components/gym-search-inputs';
import GymList from '../components/gym-components/gym-list';

class GymSearch extends Component {
  renderGyms(gymData) {
    console.log('gymData in GymSearch', gymData);
  }
  render() {
    const { listOfGyms, fetchGyms } = this.props;
    return (
      <div>
        <GymSearchInputs />
        <GymList listOfGyms={listOfGyms} />
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { listOfGyms, error, loading} = state.gyms;
  return { listOfGyms, error, loading };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchGyms, fetchGym}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GymSearch);
