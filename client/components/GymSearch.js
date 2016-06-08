import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGyms } from '../actions/gyms-actions';
import GymSearchBar from './gym-search-bar';

class GymSearch extends Component {
  render() {
    return (
      <GymSearchBar fetchGyms={this.props.fetchGyms} />
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
