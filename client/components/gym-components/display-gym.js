import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveGym } from '../../actions/gyms-actions';

const DisplayGym = (props) => {
  console.log(props.gym);
  if (props.gym === null) {
    return null;
  }
  const saveGym = () => {

  }
  return (
    <div>
      <div>{props.gym.result.formatted_address}</div>
      <div>{props.gym.result.name}</div>
      <div>{props.gym.result.formatted_phone_number}</div>
      <button className='btn btn-default'>Save Gym</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { gym, error, loading } = state.gym;
  return { gym, error, loading };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({saveGym}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGym);
