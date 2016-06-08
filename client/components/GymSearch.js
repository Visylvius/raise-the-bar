import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGyms } from '../actions/gyms-actions';
import GymSearchBar from './gym-search-bar';
import GymList from './gym-list';

class GymSearch extends Component {
  renderGyms(gymData) {
    if (gymData === null) {
      return null;
    } else {
      return (
        <tr key={gymData.name}>
         <td>{gymData.name}</td>
         <td>{gymData.address}</td>
        </tr>
      );
    }
  }
  render() {
    return (
      <div>
        <GymSearchBar fetchGyms={this.props.fetchGyms} />
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Gym Name</th>
              <th>Gym Address</th>
            </tr>
          </thead>
          <tbody>
          {this.props.listOfGyms.map(this.renderGyms)}
          </tbody>
        </table>
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
