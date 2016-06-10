import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGyms } from '../actions/gyms-actions';
import GymSearchBar from '../components/gym-search-bar';
import GymList from '../components/gym-list';

class GymSearch extends Component {
  renderGyms(gymData) {
    console.log('gymData in GymSearch', gymData);
  }
  render() {
    const { listOfGyms, fetchGyms } = this.props;
    return (
      <div>
        <GymSearchBar fetchGyms={fetchGyms} />
        <GymList listOfGyms={listOfGyms}/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { listOfGyms, error, loading} = state.gyms;
  return { listOfGyms, error, loading };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchGyms}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GymSearch);